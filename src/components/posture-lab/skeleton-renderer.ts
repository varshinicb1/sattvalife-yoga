import * as poseDetection from '@tensorflow-models/pose-detection';

export function drawSkeleton(
  canvas: HTMLCanvasElement,
  video: HTMLVideoElement,
  keypoints: poseDetection.Keypoint[],
  jointStatus: Record<string, 'good' | 'warning' | 'error'> = {},
  jointAngles: Record<string, number> = {}
) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const confidenceThreshold = 0.35;
  const adjacentPairs = poseDetection.util.getAdjacentPairs(poseDetection.SupportedModels.MoveNet);

  // 1. Draw glowing bones
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  adjacentPairs.forEach(([i, j]) => {
    const kp1 = keypoints[i];
    const kp2 = keypoints[j];

    if (
      kp1 && kp2 &&
      kp1.score != null && kp1.score > confidenceThreshold &&
      kp2.score != null && kp2.score > confidenceThreshold
    ) {
      // Glow underlayer
      ctx.beginPath();
      ctx.moveTo(kp1.x, kp1.y);
      ctx.lineTo(kp2.x, kp2.y);
      ctx.strokeStyle = 'rgba(232, 116, 97, 0.4)';
      ctx.lineWidth = 10;
      ctx.stroke();

      // Sharp foreground bone
      ctx.beginPath();
      ctx.moveTo(kp1.x, kp1.y);
      ctx.lineTo(kp2.x, kp2.y);
      ctx.strokeStyle = '#F7C978';
      ctx.lineWidth = 4;
      ctx.stroke();
    }
  });

  // 2. Draw Keypoint Halos & Joints
  keypoints.forEach((kp) => {
    if (kp && kp.score != null && kp.score > confidenceThreshold) {
      const name = (kp.name || '').toLowerCase();
      let status: 'good' | 'warning' | 'error' = 'good';

      if (name.includes('shoulder')) {
        status = jointStatus['shoulders'] || 'good';
      } else if (name.includes('hip')) {
        status = jointStatus['hips'] || 'good';
      } else if (name.includes('knee')) {
        status = jointStatus['knees'] || 'good';
      }

      const color = getStatusColor(status);

      // Outer pulsing halo ring
      ctx.beginPath();
      ctx.arc(kp.x, kp.y, 11, 0, 2 * Math.PI);
      ctx.fillStyle = getStatusHalo(status);
      ctx.fill();

      // Inner solid node
      ctx.beginPath();
      ctx.arc(kp.x, kp.y, 5, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#FFFFFF';
      ctx.stroke();
    }
  });

  // 3. Draw joint angle tags on knees & elbows
  const kpMap = Object.fromEntries(keypoints.map(k => [k.name || '', k]));
  const drawAngleTag = (kp?: poseDetection.Keypoint, angle?: number) => {
    if (!kp || !angle || (kp.score ?? 0) < confidenceThreshold) return;
    
    const text = `${angle}°`;
    ctx.font = 'bold 12px sans-serif';
    const textMetrics = ctx.measureText(text);
    const padding = 4;
    const bgW = textMetrics.width + padding * 2;
    const bgH = 18;
    const posX = kp.x + 12;
    const posY = kp.y - 8;

    ctx.fillStyle = 'rgba(26, 26, 24, 0.75)';
    ctx.beginPath();
    if (typeof ctx.roundRect === 'function') {
      ctx.roundRect(posX, posY - 14, bgW, bgH, 4);
    } else {
      ctx.rect(posX, posY - 14, bgW, bgH);
    }
    ctx.fill();

    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(text, posX + padding, posY);
  };

  const leftKnee = kpMap.left_knee || kpMap.leftKnee;
  const rightKnee = kpMap.right_knee || kpMap.rightKnee;
  const leftElbow = kpMap.left_elbow || kpMap.leftElbow;
  const rightElbow = kpMap.right_elbow || kpMap.rightElbow;

  if (jointAngles['leftKnee']) drawAngleTag(leftKnee, jointAngles['leftKnee']);
  if (jointAngles['rightKnee']) drawAngleTag(rightKnee, jointAngles['rightKnee']);
  if (jointAngles['leftElbow']) drawAngleTag(leftElbow, jointAngles['leftElbow']);
  if (jointAngles['rightElbow']) drawAngleTag(rightElbow, jointAngles['rightElbow']);
}

function getStatusColor(status: 'good' | 'warning' | 'error'): string {
  switch (status) {
    case 'good': return '#10B981'; // Emerald Green
    case 'warning': return '#F59E0B'; // Warm Amber
    case 'error': return '#EF4444'; // Coral Red
    default: return '#E87461';
  }
}

function getStatusHalo(status: 'good' | 'warning' | 'error'): string {
  switch (status) {
    case 'good': return 'rgba(16, 185, 129, 0.28)';
    case 'warning': return 'rgba(245, 158, 11, 0.28)';
    case 'error': return 'rgba(239, 68, 68, 0.28)';
    default: return 'rgba(232, 116, 97, 0.25)';
  }
}

