import * as poseDetection from '@tensorflow-models/pose-detection';

export interface KeypointMap {
  [name: string]: poseDetection.Keypoint | undefined;
}

export type JointQuality = 'good' | 'warning' | 'error';

export interface JointFeedback {
  joint: string;
  status: JointQuality;
  angle?: number;
  targetAngle?: number;
  message: string;
}

export interface AsanaDefinition {
  id: string;
  name: string;
  sanskritName: string;
  category: 'standing' | 'balancing' | 'seated' | 'floor' | 'inversion';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  targetMuscles: string[];
  keyAlignmentRules: string[];
}

export interface PostureAnalysisResult {
  detectedPose: string;
  sanskritName: string;
  targetPose: string;
  score: number; // 0 to 1
  isTargetMatch: boolean;
  cues: string[];
  jointStatus: Record<string, JointQuality>;
  jointAngles: Record<string, number>;
  jointFeedbacks: JointFeedback[];
  holdProgress: number; // 0 to 100%
  inFrame: boolean;
}

export const ASANA_LIBRARY: AsanaDefinition[] = [
  {
    id: 'tadasana',
    name: 'Mountain Pose',
    sanskritName: 'Tādāsana',
    category: 'standing',
    difficulty: 'Beginner',
    description: 'The foundation of all standing poses, establishing alignment, grounding, and steady breath.',
    targetMuscles: ['Thighs', 'Ankles', 'Abdomen', 'Spine'],
    keyAlignmentRules: [
      'Feet parallel under hips',
      'Shoulders relaxed and aligned over hips',
      'Spine tall with neutral pelvis',
      'Arms relaxed by sides or in Anjali Mudra'
    ]
  },
  {
    id: 'vrikshasana',
    name: 'Tree Pose',
    sanskritName: 'Vṛkṣāsana',
    category: 'balancing',
    difficulty: 'Beginner',
    description: 'Develops poise, balance, mental focus, and opens the hips.',
    targetMuscles: ['Core', 'Ankles', 'Calves', 'Groin'],
    keyAlignmentRules: [
      'Standing leg firm and straight',
      'Lifted foot placed on inner thigh or calf (avoid knee joint)',
      'Hips squared and level',
      'Hands at heart center or extended skyward'
    ]
  },
  {
    id: 'virabhadrasana1',
    name: 'Warrior I',
    sanskritName: 'Vīrabhadrāsana I',
    category: 'standing',
    difficulty: 'Beginner',
    description: 'Builds focus, stamina, and opens the chest, lungs, and hips.',
    targetMuscles: ['Quads', 'Glutes', 'Deltoids', 'Core'],
    keyAlignmentRules: [
      'Front knee bent directly over ankle (~90°)',
      'Back leg straight with heel grounded',
      'Torso upright facing front',
      'Arms extended straight overhead along ears'
    ]
  },
  {
    id: 'virabhadrasana2',
    name: 'Warrior II',
    sanskritName: 'Vīrabhadrāsana II',
    category: 'standing',
    difficulty: 'Beginner',
    description: 'Increases endurance, opens hips, and strengthens the legs and shoulders.',
    targetMuscles: ['Thighs', 'Groin', 'Shoulders', 'Chest'],
    keyAlignmentRules: [
      'Front knee stacked over ankle (~90°)',
      'Back leg straight and active',
      'Arms extended parallel to the floor',
      'Torso centered, gaze over front middle finger'
    ]
  },
  {
    id: 'trikonasana',
    name: 'Triangle Pose',
    sanskritName: 'Utthita Trikoṇāsana',
    category: 'standing',
    difficulty: 'Beginner',
    description: 'Lengthens the spine, opens the chest and hamstrings, and improves digestion.',
    targetMuscles: ['Hamstrings', 'Groin', 'Obliques', 'Chest'],
    keyAlignmentRules: [
      'Both legs straight and strong',
      'Torso extended laterally over front leg without collapsing',
      'Top arm reaching straight up to ceiling',
      'Chest open and turned upward'
    ]
  },
  {
    id: 'utkatasana',
    name: 'Chair Pose',
    sanskritName: 'Utkaṭāsana',
    category: 'standing',
    difficulty: 'Beginner',
    description: 'Ignites internal heat, strengthens the thighs, ankles, and spine.',
    targetMuscles: ['Quadriceps', 'Glutes', 'Calves', 'Spine'],
    keyAlignmentRules: [
      'Knees bent ~90-110° and tracking behind toes',
      'Hips sinking down and back',
      'Torso angled slightly forward with long spine',
      'Arms raised overhead parallel to each other'
    ]
  },
  {
    id: 'goddess',
    name: 'Goddess Pose',
    sanskritName: 'Utkaṭa Koṇāsana',
    category: 'standing',
    difficulty: 'Intermediate',
    description: 'A powerful hip and heart opener that builds heat, strengthens the lower body, and awakens inner strength.',
    targetMuscles: ['Inner Thighs', 'Quadriceps', 'Glutes', 'Calves', 'Shoulders'],
    keyAlignmentRules: [
      'Wide stance with feet turned outward ~45°',
      'Knees bent ~90-100° tracking directly over toes',
      'Spine upright with neutral pelvis and engaged core',
      'Arms in cactus/goalpost position with elbows at 90°'
    ]
  },
  {
    id: 'plank',
    name: 'Plank Pose',
    sanskritName: 'Phalakasāna',
    category: 'floor',
    difficulty: 'Beginner',
    description: 'Foundational arm balance and core strengthener that builds total-body stability and stamina.',
    targetMuscles: ['Transverse Abdominis', 'Shoulders', 'Chest', 'Quadriceps'],
    keyAlignmentRules: [
      'Shoulders stacked directly over wrists',
      'Straight line from crown of head to heels (~170° hip & knee angle)',
      'Core firmly braced without sagging or piking hips',
      'Arms straight with elbows active (~170°)'
    ]
  },
  {
    id: 'adhomukha',
    name: 'Downward-Facing Dog',
    sanskritName: 'Adho Mukha Śvānāsana',
    category: 'standing',
    difficulty: 'Beginner',
    description: 'Rejuvenating inversion that elongates the spine, hamstrings, and calves.',
    targetMuscles: ['Hamstrings', 'Calves', 'Shoulders', 'Lats'],
    keyAlignmentRules: [
      'Body forms an inverted "V" shape (~65-80° hip angle)',
      'Arms and spine in one continuous straight line',
      'Hips pressing high and back',
      'Heels reaching gently toward the floor'
    ]
  },
  {
    id: 'bhujangasana',
    name: 'Cobra Pose',
    sanskritName: 'Bhujaṅgāsana',
    category: 'floor',
    difficulty: 'Beginner',
    description: 'Gentle backbend that opens the heart, strengthens the spine, and soothes sciatica.',
    targetMuscles: ['Back Extensors', 'Chest', 'Shoulders', 'Glutes'],
    keyAlignmentRules: [
      'Pelvis and tops of feet grounded on floor',
      'Chest lifted with shoulders rolling down and back',
      'Elbows slightly bent and hugging ribs',
      'Neck long, avoiding overarching'
    ]
  },
  {
    id: 'sukhasana',
    name: 'Easy / Meditative Pose',
    sanskritName: 'Sukhāsana',
    category: 'seated',
    difficulty: 'Beginner',
    description: 'Calming seated posture for breathwork (Pranayama) and meditation.',
    targetMuscles: ['Spine', 'Hips', 'Core'],
    keyAlignmentRules: [
      'Legs crossed comfortably',
      'Spine upright with relaxed shoulders',
      'Crown of head reaching upward',
      'Hands resting gently on knees in Mudra'
    ]
  }
];

export function calculateAngle(
  a: poseDetection.Keypoint,
  b: poseDetection.Keypoint,
  c: poseDetection.Keypoint
): number {
  const radians = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
  let angle = Math.abs((radians * 180.0) / Math.PI);
  if (angle > 180.0) {
    angle = 360.0 - angle;
  }
  return Math.round(angle);
}

function hasConfidence(kp?: poseDetection.Keypoint, min = 0.35): kp is poseDetection.Keypoint {
  return !!kp && (kp.score ?? 0) >= min;
}

export function analyzePosture(
  rawKeypoints: poseDetection.Keypoint[],
  targetPoseId?: string
): PostureAnalysisResult {
  const kp: KeypointMap = Object.fromEntries(rawKeypoints.map(k => [k.name || '', k]));
  const cues: string[] = [];
  const jointStatus: Record<string, JointQuality> = {};
  const jointAngles: Record<string, number> = {};
  const jointFeedbacks: JointFeedback[] = [];

  const leftShoulder = kp.left_shoulder || kp.leftShoulder;
  const rightShoulder = kp.right_shoulder || kp.rightShoulder;
  const leftElbow = kp.left_elbow || kp.leftElbow;
  const rightElbow = kp.right_elbow || kp.rightElbow;
  const leftWrist = kp.left_wrist || kp.leftWrist;
  const rightWrist = kp.right_wrist || kp.rightWrist;
  const leftHip = kp.left_hip || kp.leftHip;
  const rightHip = kp.right_hip || kp.rightHip;
  const leftKnee = kp.left_knee || kp.leftKnee;
  const rightKnee = kp.right_knee || kp.rightKnee;
  const leftAnkle = kp.left_ankle || kp.leftAnkle;
  const rightAnkle = kp.right_ankle || kp.rightAnkle;

  // Check visibility of core anchor points
  const hasShoulders = hasConfidence(leftShoulder) && hasConfidence(rightShoulder);
  const hasHips = hasConfidence(leftHip) && hasConfidence(rightHip);
  const hasKnees = hasConfidence(leftKnee) || hasConfidence(rightKnee);
  const hasAnkles = hasConfidence(leftAnkle) || hasConfidence(rightAnkle);
  const isFullBodyInFrame = hasShoulders && hasHips && hasKnees && hasAnkles;

  if (!hasShoulders && !hasHips) {
    return {
      detectedPose: 'Positioning...',
      sanskritName: 'Preparing',
      targetPose: targetPoseId || 'auto',
      score: 0,
      isTargetMatch: false,
      cues: ['Step back 6-8 feet to fit your entire body inside the frame.'],
      jointStatus: {},
      jointAngles: {},
      jointFeedbacks: [],
      holdProgress: 0,
      inFrame: false
    };
  }

  // Key joint angle computations
  let leftElbowAngle = 180;
  let rightElbowAngle = 180;
  let leftKneeAngle = 180;
  let rightKneeAngle = 180;
  let leftHipAngle = 180;
  let rightHipAngle = 180;
  let leftShoulderAngle = 0;
  let rightShoulderAngle = 0;

  if (hasConfidence(leftShoulder) && hasConfidence(leftElbow) && hasConfidence(leftWrist)) {
    leftElbowAngle = calculateAngle(leftShoulder, leftElbow, leftWrist);
    jointAngles['leftElbow'] = leftElbowAngle;
  }
  if (hasConfidence(rightShoulder) && hasConfidence(rightElbow) && hasConfidence(rightWrist)) {
    rightElbowAngle = calculateAngle(rightShoulder, rightElbow, rightWrist);
    jointAngles['rightElbow'] = rightElbowAngle;
  }
  if (hasConfidence(leftHip) && hasConfidence(leftKnee) && hasConfidence(leftAnkle)) {
    leftKneeAngle = calculateAngle(leftHip, leftKnee, leftAnkle);
    jointAngles['leftKnee'] = leftKneeAngle;
  }
  if (hasConfidence(rightHip) && hasConfidence(rightKnee) && hasConfidence(rightAnkle)) {
    rightKneeAngle = calculateAngle(rightHip, rightKnee, rightAnkle);
    jointAngles['rightKnee'] = rightKneeAngle;
  }
  if (hasConfidence(leftShoulder) && hasConfidence(leftHip) && hasConfidence(leftKnee)) {
    leftHipAngle = calculateAngle(leftShoulder, leftHip, leftKnee);
    jointAngles['leftHip'] = leftHipAngle;
  }
  if (hasConfidence(rightShoulder) && hasConfidence(rightHip) && hasConfidence(rightKnee)) {
    rightHipAngle = calculateAngle(rightShoulder, rightHip, rightKnee);
    jointAngles['rightHip'] = rightHipAngle;
  }
  if (hasConfidence(leftHip) && hasConfidence(leftShoulder) && hasConfidence(leftElbow)) {
    leftShoulderAngle = calculateAngle(leftHip, leftShoulder, leftElbow);
    jointAngles['leftShoulder'] = leftShoulderAngle;
  }
  if (hasConfidence(rightHip) && hasConfidence(rightShoulder) && hasConfidence(rightElbow)) {
    rightShoulderAngle = calculateAngle(rightHip, rightShoulder, rightElbow);
    jointAngles['rightShoulder'] = rightShoulderAngle;
  }

  // Bilateral symmetry checks
  if (hasConfidence(leftShoulder) && hasConfidence(rightShoulder)) {
    const shoulderDiff = Math.abs(leftShoulder.y - rightShoulder.y);
    if (shoulderDiff < 20) {
      jointStatus['shoulders'] = 'good';
    } else if (shoulderDiff < 40) {
      jointStatus['shoulders'] = 'warning';
      cues.push('Level your shoulders evenly.');
    } else {
      jointStatus['shoulders'] = 'error';
      cues.push('Keep your shoulders level and relaxed away from ears.');
    }
  }

  if (hasConfidence(leftHip) && hasConfidence(rightHip)) {
    const hipDiff = Math.abs(leftHip.y - rightHip.y);
    if (hipDiff < 22) {
      jointStatus['hips'] = 'good';
    } else if (hipDiff < 45) {
      jointStatus['hips'] = 'warning';
      cues.push('Square your hips evenly forward.');
    } else {
      jointStatus['hips'] = 'error';
      cues.push('Balance your weight evenly across both hips.');
    }
  }

  // Posture detection logic
  const isLeftArmHorizontal = hasConfidence(leftWrist) && hasConfidence(leftShoulder) && Math.abs(leftWrist.y - leftShoulder.y) < 65;
  const isRightArmHorizontal = hasConfidence(rightWrist) && hasConfidence(rightShoulder) && Math.abs(rightWrist.y - rightShoulder.y) < 65;
  const areArmsHorizontal = isLeftArmHorizontal && isRightArmHorizontal;

  const isLeftKneeBent = hasConfidence(leftKnee) && leftKneeAngle > 60 && leftKneeAngle < 145;
  const isRightKneeBent = hasConfidence(rightKnee) && rightKneeAngle > 60 && rightKneeAngle < 145;
  const isSingleKneeBent = (isLeftKneeBent && rightKneeAngle > 155) || (isRightKneeBent && leftKneeAngle > 155);
  const areBothKneesBent = isLeftKneeBent && isRightKneeBent;

  // Tree Pose detection (One ankle near opposite knee/thigh)
  const isTreePoseLeft = hasConfidence(leftAnkle) && hasConfidence(rightKnee) && Math.abs(leftAnkle.y - rightKnee.y) < 70 && Math.abs(leftAnkle.x - rightKnee.x) < 90;
  const isTreePoseRight = hasConfidence(rightAnkle) && hasConfidence(leftKnee) && Math.abs(rightAnkle.y - leftKnee.y) < 70 && Math.abs(rightAnkle.x - leftKnee.x) < 90;
  const isTreeLeg = (isTreePoseLeft || isTreePoseRight) && (leftKneeAngle > 155 || rightKneeAngle > 155);

  // Downward Dog & Plank positions
  const avgHipY = ((leftHip?.y || 0) + (rightHip?.y || 0)) / 2;
  const avgShoulderY = ((leftShoulder?.y || 0) + (rightShoulder?.y || 0)) / 2;
  const avgAnkleY = ((leftAnkle?.y || 0) + (rightAnkle?.y || 0)) / 2;

  // Plank Candidate: Body horizontal (shoulders & hips near same height) + straight line
  const isHorizontalBody = hasHips && hasConfidence(leftAnkle) && Math.abs(avgShoulderY - avgHipY) < 75 && Math.abs(avgHipY - avgAnkleY) < 85;
  const isPlankCandidate = isHorizontalBody && (leftHipAngle > 150 && rightHipAngle > 150) && (leftElbowAngle > 145 || rightElbowAngle > 145);

  // Downward Dog: Hips must be highest point in frame (lowest Y in screen space)
  const isDownwardDogCandidate = hasHips && hasConfidence(leftAnkle) && avgHipY < (avgShoulderY - 40) && avgHipY < (avgAnkleY - 40);

  let detectedId = 'tadasana';
  let score = 0.50;
  let isTargetMatch = false;

  // =========================================================================
  // TARGET POSE EVALUATION: If user explicitly selected an asana
  // =========================================================================
  if (targetPoseId && targetPoseId !== 'auto') {
    detectedId = targetPoseId;

    if (targetPoseId === 'virabhadrasana2') {
      // WARRIOR II
      if (!isFullBodyInFrame) {
        score = 0.15;
        isTargetMatch = false;
        cues.push('Step back 6–8 ft so your entire body (hips to feet) is visible for Warrior II.');
      } else {
        let pts = 0;
        // 1. Arm horizontality (35%)
        if (areArmsHorizontal) {
          pts += 35;
        } else if (isLeftArmHorizontal || isRightArmHorizontal) {
          pts += 18;
          cues.push('Extend both arms horizontal and parallel to the floor.');
        } else {
          cues.push('Raise both arms to shoulder height, parallel to your mat.');
        }

        // 2. Front knee bend ~85-105° (35%)
        if (isSingleKneeBent) {
          const frontAngle = isLeftKneeBent ? leftKneeAngle : rightKneeAngle;
          if (frontAngle >= 85 && frontAngle <= 105) {
            pts += 35;
          } else {
            pts += 20;
            cues.push('Deepen front knee bend closer to a 90° angle over ankle.');
          }
        } else {
          cues.push('Step feet wide and bend your front knee toward 90°.');
        }

        // 3. Back leg straight (20%)
        const backAngle = isLeftKneeBent ? rightKneeAngle : leftKneeAngle;
        if (backAngle >= 160) {
          pts += 20;
        } else {
          cues.push('Keep the back leg straight, grounding through the outer heel.');
        }

        // 4. Upright torso & level shoulders (10%)
        if (jointStatus['shoulders'] === 'good') pts += 10;

        score = Math.max(0.2, Math.min(0.98, pts / 100));
        isTargetMatch = score >= 0.75;
      }

    } else if (targetPoseId === 'vrikshasana') {
      // TREE POSE
      if (!isFullBodyInFrame) {
        score = 0.15;
        isTargetMatch = false;
        cues.push('Step back so your full body, legs, and feet are in frame for Tree Pose.');
      } else {
        let pts = 0;
        if (isTreeLeg || (isSingleKneeBent && !areArmsHorizontal)) {
          pts += 50;
        } else {
          cues.push('Lift one foot to inner thigh or calf (avoid the knee joint).');
        }
        if (leftKneeAngle >= 165 || rightKneeAngle >= 165) pts += 25;
        if (jointStatus['shoulders'] === 'good') pts += 25;
        score = Math.max(0.2, Math.min(0.96, pts / 100));
        isTargetMatch = score >= 0.75;
      }

    } else if (targetPoseId === 'goddess') {
      // GODDESS POSE
      if (!isFullBodyInFrame) {
        score = 0.15;
        isTargetMatch = false;
        cues.push('Step back so your legs and wide squat are in frame.');
      } else {
        let pts = 0;
        if (areBothKneesBent) pts += 45;
        else cues.push('Sink hips lower with knees tracking over toes.');
        if (leftElbowAngle >= 75 && leftElbowAngle <= 115 && rightElbowAngle >= 75 && rightElbowAngle <= 115) pts += 40;
        else cues.push('Hold arms in cactus/goalpost position with elbows at 90°.');
        if (jointStatus['shoulders'] === 'good') pts += 15;
        score = Math.max(0.2, Math.min(0.96, pts / 100));
        isTargetMatch = score >= 0.75;
      }

    } else if (targetPoseId === 'plank') {
      // PLANK POSE
      if (!isPlankCandidate) {
        score = 0.15;
        isTargetMatch = false;
        cues.push('Plank requires holding a horizontal push-up position on your mat.');
      } else {
        score = 0.92;
        isTargetMatch = true;
      }

    } else if (targetPoseId === 'adhomukha') {
      // DOWNWARD DOG
      if (!isDownwardDogCandidate) {
        score = 0.15;
        isTargetMatch = false;
        cues.push('Press hips high and back to create an inverted "V" shape.');
      } else {
        score = 0.94;
        isTargetMatch = true;
      }

    } else if (targetPoseId === 'sukhasana') {
      // SEATED / MEDITATIVE POSE
      let pts = 60;
      if (jointStatus['shoulders'] === 'good') pts += 25;
      if (hasShoulders) pts += 15;
      score = pts / 100;
      isTargetMatch = true;
      cues.push('Sit tall through crown of head, relax shoulders, and breathe smoothly.');

    } else {
      // Generic check for standing poses (e.g. Mountain, Warrior I)
      if (!isFullBodyInFrame) {
        score = 0.15;
        isTargetMatch = false;
        cues.push('Step back 6-8 ft so your entire body is visible.');
      } else {
        score = 0.82;
        isTargetMatch = true;
      }
    }

  } else {
    // =========================================================================
    // AUTO-DETECT MODE: Identify pose based on detected geometry
    // =========================================================================
    if (!isFullBodyInFrame) {
      // Only head/shoulders visible (sitting on sofa, chair, or too close)
      detectedId = 'sukhasana';
      score = jointStatus['shoulders'] === 'good' ? 0.85 : 0.70;
      isTargetMatch = true;
      cues.push('Upper body detected. Sit tall with relaxed shoulders, or step back 6–8 ft for standing asanas.');
    } else if (isPlankCandidate) {
      detectedId = 'plank';
      score = 0.92;
      isTargetMatch = true;
    } else if (isDownwardDogCandidate) {
      detectedId = 'adhomukha';
      score = 0.94;
      isTargetMatch = true;
    } else if (isTreeLeg) {
      detectedId = 'vrikshasana';
      score = 0.90;
      isTargetMatch = true;
    } else if (areArmsHorizontal && isSingleKneeBent) {
      detectedId = 'virabhadrasana2';
      score = 0.92;
      isTargetMatch = true;
    } else if (areBothKneesBent && (leftElbowAngle >= 70 && rightElbowAngle >= 70)) {
      detectedId = 'goddess';
      score = 0.88;
      isTargetMatch = true;
    } else {
      detectedId = 'tadasana';
      score = 0.85;
      isTargetMatch = true;
      cues.push('Mountain Pose detected: Stand tall with feet grounded and spine long.');
    }
  }

  const asanaDef = ASANA_LIBRARY.find(a => a.id === detectedId) || ASANA_LIBRARY[0];

  if (cues.length === 0) {
    cues.push('Breathe smoothly through the nose. Hold the posture with grace.');
  }

  jointFeedbacks.push({
    joint: 'Shoulders',
    status: jointStatus['shoulders'] || 'good',
    message: jointStatus['shoulders'] === 'error' ? 'Uneven shoulders' : 'Shoulders aligned'
  });

  jointFeedbacks.push({
    joint: 'Hips & Core',
    status: jointStatus['hips'] || 'good',
    message: jointStatus['hips'] === 'warning' ? 'Level hips' : 'Pelvis centered'
  });

  if (jointAngles['leftKnee']) {
    jointFeedbacks.push({
      joint: 'Left Knee',
      status: isLeftKneeBent && leftKneeAngle < 75 ? 'warning' : 'good',
      angle: leftKneeAngle,
      message: `${leftKneeAngle}° angle`
    });
  }

  if (jointAngles['rightKnee']) {
    jointFeedbacks.push({
      joint: 'Right Knee',
      status: isRightKneeBent && rightKneeAngle < 75 ? 'warning' : 'good',
      angle: rightKneeAngle,
      message: `${rightKneeAngle}° angle`
    });
  }

  if (jointAngles['leftElbow']) {
    const isGoddessWarning = detectedId === 'goddess' && (leftElbowAngle < 75 || leftElbowAngle > 115);
    jointFeedbacks.push({
      joint: 'Left Elbow',
      status: isGoddessWarning ? 'warning' : 'good',
      angle: leftElbowAngle,
      message: isGoddessWarning ? (leftElbowAngle < 75 ? 'Open left arm more' : 'Bend left arm to 90°') : `${leftElbowAngle}° angle`
    });
  }

  if (jointAngles['rightElbow']) {
    const isGoddessWarning = detectedId === 'goddess' && (rightElbowAngle < 75 || rightElbowAngle > 115);
    jointFeedbacks.push({
      joint: 'Right Elbow',
      status: isGoddessWarning ? 'warning' : 'good',
      angle: rightElbowAngle,
      message: isGoddessWarning ? (rightElbowAngle < 75 ? 'Open right arm more' : 'Bend right arm to 90°') : `${rightElbowAngle}° angle`
    });
  }

  return {
    detectedPose: asanaDef.name,
    sanskritName: asanaDef.sanskritName,
    targetPose: targetPoseId || detectedId,
    score,
    isTargetMatch,
    cues,
    jointStatus,
    jointAngles,
    jointFeedbacks,
    holdProgress: Math.min(100, Math.round(score * 100)),
    inFrame: true
  };
}

