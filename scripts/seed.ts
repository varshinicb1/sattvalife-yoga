import { db } from '../lib/db';
import { schema } from '../lib/db/schema';

async function seed() {
  console.log('Seeding database...');

  // Locations
  const locations = await db.insert(schema.locations).values([
    {
      name: 'Trinity Methodist Church',
      slug: 'trinity-methodist-church',
      address: 'The Parade, Oadby',
      city: 'Leicester',
      postcode: 'LE2 5AB',
      latitude: 52.6001,
      longitude: -1.0787,
      amenities: ['Free parking', 'Changing rooms', 'Mats provided'],
      isActive: true,
    },
    {
      name: 'Thurnby Memorial Hall',
      slug: 'thurnby-memorial-hall',
      address: 'Main Street, Thurnby',
      city: 'Leicester',
      postcode: 'LE7 9PN',
      latitude: 52.6301,
      longitude: -1.0487,
      amenities: ['Free parking', 'Wheelchair accessible'],
      isActive: true,
    },
  ]).returning();

  console.log(`Created ${locations.length} locations`);

  // Instructors
  const instructors = await db.insert(schema.instructors).values([
    {
      name: 'Amisha Soni',
      slug: 'amisha-soni',
      title: 'Lead Yoga Instructor',
      shortBio: 'As a teenager I was already pondering upon the meaning of life. My curiosity towards life and a constant push from my father led me to learn yoga for my personal development.',
      specialties: ['Vinyasa Flow', 'Hatha Yoga', 'Meditation', 'Corporate Wellness'],
      certifications: [{ name: 'RYT-200', year: 2018, issuer: 'Yoga Alliance' }, { name: 'RYT-500', year: 2020, issuer: 'Yoga Alliance' }],
      yearsExperience: 8,
      isActive: true,
    },
    {
      name: 'Nish Soni',
      slug: 'nish-soni',
      title: 'Yoga Instructor',
      shortBio: 'I discovered my inner self through yoga amidst the hush life of a metro city.',
      specialties: ['Hatha Yoga', 'Meditation', 'Breathwork'],
      certifications: [{ name: 'RYT-200', year: 2019, issuer: 'Yoga Alliance' }],
      yearsExperience: 5,
      isActive: true,
    },
  ]).returning();

  console.log(`Created ${instructors.length} instructors`);

  // Courses
  const courses = await db.insert(schema.courses).values([
    {
      title: 'Vinyasa Flow',
      slug: 'vinyasa-flow',
      shortDescription: 'Dynamic flow for strength and flexibility',
      longDescription: { content: 'Dynamic, breath-synchronised movement building strength, flexibility and mindful awareness. Improve cardiovascular health, build functional strength, and reduce stress.', format: 'html' },
      type: 'offline',
      level: 'all',
      durationMinutes: 60,
      priceCents: 1000,
      capacity: 20,
      instructorId: instructors[0].id,
      schedule: [{
        frequency: 'weekly',
        daysOfWeek: [2],
        startTime: '18:30',
        endTime: '19:30',
        startDate: '2026-01-06',
        timezone: 'Europe/London',
      }],
      isActive: true,
    },
    {
      title: 'Hatha Yoga',
      slug: 'hatha-yoga',
      shortDescription: 'Traditional postures for alignment and release',
      longDescription: { content: 'Traditional postures held with mindful awareness for deep release and alignment. Improve posture, balance your nervous system, and find deep muscular release.', format: 'html' },
      type: 'offline',
      level: 'all',
      durationMinutes: 60,
      priceCents: 1000,
      capacity: 20,
      instructorId: instructors[1].id,
      schedule: [{
        frequency: 'weekly',
        daysOfWeek: [4],
        startTime: '19:00',
        endTime: '20:00',
        startDate: '2026-01-08',
        timezone: 'Europe/London',
      }],
      isActive: true,
    },
    {
      title: 'Private Yoga Session',
      slug: 'private-session',
      shortDescription: 'Personalised one-on-one yoga',
      longDescription: { content: 'One-on-one personalised yoga session tailored to your specific needs, goals, and abilities.', format: 'html' },
      type: 'offline',
      level: 'all',
      durationMinutes: 60,
      priceCents: 4000,
      capacity: 1,
      instructorId: instructors[0].id,
      schedule: [{
        frequency: 'weekly',
        daysOfWeek: [0, 1, 2, 3, 4, 5],
        startTime: '09:00',
        endTime: '17:00',
        startDate: '2026-01-06',
        timezone: 'Europe/London',
      }],
      isActive: true,
    },
    {
      title: 'Corporate Wellness',
      slug: 'corporate-wellness',
      shortDescription: 'Wellness programmes for your workplace',
      longDescription: { content: 'Customised yoga and wellness programmes for your workplace. On-site or virtual sessions to reduce stress, improve posture, and boost team wellbeing.', format: 'html' },
      type: 'offline',
      level: 'all',
      durationMinutes: 45,
      priceCents: 0,
      capacity: 30,
      instructorId: instructors[0].id,
      schedule: [{
        frequency: 'weekly',
        daysOfWeek: [1, 2, 3, 4, 5],
        startTime: '12:00',
        endTime: '13:00',
        startDate: '2026-01-06',
        timezone: 'Europe/London',
      }],
      isActive: true,
    },
  ]).returning();

  console.log(`Created ${courses.length} courses`);

  // Course sessions
  const sessions = await db.insert(schema.courseSessions).values([
    {
      courseId: courses[0].id,
      sessionDate: new Date('2026-01-06'),
      startTime: '18:30',
      endTime: '19:30',
      capacity: 20,
      locationId: locations[0].id,
      instructorId: instructors[0].id,
    },
    {
      courseId: courses[1].id,
      sessionDate: new Date('2026-01-08'),
      startTime: '19:00',
      endTime: '20:00',
      capacity: 20,
      locationId: locations[1].id,
      instructorId: instructors[1].id,
    },
  ]).returning();

  console.log(`Created ${sessions.length} course sessions`);

  // Blog posts
  const posts = await db.insert(schema.blogPosts).values([
    {
      title: '3 Quick Yoga Asanas to Get Relief from Back Pain',
      slug: '3-quick-yoga-asanas-to-get-relief-from-back-pain',
      excerpt: 'If you are suffering from back pain, then these three quick yoga asanas can give you relief sitting right on your chair!',
      content: { content: `Do you suffer from back pain? You are not alone. Back pain is one of the most common health complaints in the UK, affecting millions of people every year.

The good news is that yoga offers simple, effective solutions that you can do anywhere - even sitting at your desk!

## 1. Cat-Cow Pose (Marjaryasana-Bitilasana)

This gentle flow between two poses warms up the spine and relieves tension in the back and neck.

**How to do it:**
- Come onto your hands and knees
- Inhale, drop your belly, lift your chest and tailbone (Cow)
- Exhale, round your spine, tuck your chin to chest (Cat)
- Repeat 10 times

## 2. Child's Pose (Balasana)

A restful pose that gently stretches the lower back.

**How to do it:**
- Kneel on the floor, touch your big toes together
- Sit back on your heels
- Fold forward, extending your arms in front
- Breathe deeply for 5-10 breaths

## 3. Seated Spinal Twist (Ardha Matsyendrasana)

This twist mobilises the spine and relieves tension between the shoulder blades.

**How to do it:**
- Sit on a chair with feet flat on the floor
- Twist your torso to the right, using the back of the chair for support
- Hold for 5 breaths, then switch sides

Remember to listen to your body and never force any movement. If you experience sharp pain, stop immediately.`, format: 'html' },
      category: 'yoga-tips',
      tags: ['back pain', 'asanas', 'yoga for beginners', 'office yoga'],
      publishedAt: new Date('2026-03-15'),
      isPublished: true,
      authorId: null,
    },
    {
      title: 'Conclusion: Empowering Children through Yoga',
      slug: 'conclusion-empowering-children-through-yoga',
      excerpt: 'Discover how yoga can empower children with confidence, focus, and emotional balance.',
      content: { content: `Yoga is not just for adults. Children can benefit enormously from a regular yoga practice, developing physical strength, emotional resilience, and mental focus.

## Why Children Need Yoga

In today's fast-paced world, children face more pressure than ever before. From academic expectations to social media, the stressors on young minds are unprecedented. Yoga provides a healthy outlet and a toolkit for life.

## Key Benefits

### Physical Benefits
- Improved flexibility and strength
- Better posture (especially important with increased screen time)
- Enhanced coordination and balance
- Healthier sleep patterns

### Mental Benefits
- Improved concentration and focus
- Reduced anxiety and stress
- Greater self-awareness
- Emotional regulation skills

### Social Benefits
- Increased confidence and self-esteem
- Better interpersonal skills
- Compassion and empathy for others
- Teamwork in group classes

## Getting Started

Start with simple poses like:
- **Tree Pose** for balance and focus
- **Downward Dog** for strength and energy
- **Butterfly Pose** for hip flexibility
- **Savasana** for relaxation

Make it fun! Use animal names for poses, play calming music, and keep sessions short (15-20 minutes for younger children).

At Sattvalife, we believe yoga is a gift that keeps giving. By introducing children to yoga early, we equip them with tools that will serve them throughout their lives.`, format: 'html' },
      category: 'children-yoga',
      tags: ['children', 'kids yoga', 'empowerment', 'education'],
      publishedAt: new Date('2026-02-20'),
      isPublished: true,
      authorId: null,
    },
    {
      title: 'Yoga and Meditation',
      slug: 'yoga-and-meditation',
      excerpt: 'Explore the profound connection between yoga and meditation, and how combining them transforms your practice.',
      content: { content: `Yoga and meditation are two sides of the same coin. While yoga prepares the body for stillness, meditation trains the mind for clarity. Together, they form a complete system for wellbeing.

## The Connection

The word "yoga" comes from the Sanskrit root "yuj," meaning to unite or join. Meditation (dhyana) is an integral part of this union. The physical postures (asanas) were originally designed not as exercise, but as preparation for prolonged sitting in meditation.

## How Yoga Supports Meditation

### Physical Preparation
- Opens tight hips and hamstrings for comfortable sitting
- Strengthens the back for good posture
- Releases tension that distracts the mind

### Breath Awareness
- Pranayama (breath control) calms the nervous system
- Teaches focus on a single point (the breath)
- Bridges the gap between body and mind

### Mental Training
- Develops concentration (dharana)
- Cultivates mindfulness on the mat
- Builds the habit of present-moment awareness

## A Simple Practice

Try this 20-minute routine:
1. **5 minutes** - Gentle warm-up (Cat-Cow, shoulder rolls)
2. **10 minutes** - Slow Vinyasa flow (5-6 rounds of Sun Salutation)
3. **5 minutes** - Seated meditation (follow your breath)

## The Science

Research shows that combining yoga with meditation produces greater reductions in cortisol (stress hormone) and improvements in mood than either practice alone.

## Start Today

You don't need to be flexible to meditate, and you don't need to be calm to do yoga. Both practices meet you where you are.

Join us at Sattvalife for classes that integrate movement and mindfulness.`, format: 'html' },
      category: 'meditation',
      tags: ['meditation', 'mindfulness', 'yoga philosophy', 'wellness'],
      publishedAt: new Date('2026-01-10'),
      isPublished: true,
      authorId: null,
    },
  ]).returning();

  console.log(`Created ${posts.length} blog posts`);

  // Admin user
  const bcrypt = await import('bcryptjs');
  const passwordHash = await bcrypt.hash('admin123', 12);

  const admin = await db.insert(schema.users).values({
    name: 'Amisha Soni',
    email: 'admin@sattvalife.yoga',
    passwordHash,
    role: 'admin',
    emailVerified: new Date(),
  }).returning();

  console.log(`Created admin user: ${admin[0].email}`);
  console.log('Admin password: admin123');
  console.log('Seed complete!');
}

seed().catch((error) => {
  console.error('Seed failed:', error);
  process.exit(1);
});
