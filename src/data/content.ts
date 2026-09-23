/**
 * Static site content: the defaults that ship in the bundle.
 * Copy is sourced from the original sattvalife.yoga site; useCmsContent overlays
 * any fields the owner edits in the admin app.
 */

export const BRAND = {
  name: 'Sattvalife Yoga',
  tagline: 'Stop Worrying, Start Living',
  location: 'Leicester, UK',
  copyright: 'Sattvalife Yoga',
}

/** Contact channels. WhatsApp can be overridden from the admin app (Settings). */
export const CONTACT = {
  whatsapp: '+44 7551 100218',
  email: 'info@sattvalife.yoga',
  instagram: 'https://www.instagram.com/sattvalifeyoga/',
  facebook: 'https://www.facebook.com/sattvalifeyoga',
  whatsappMessage: "Hi! I'd like to know more about Sattvalife Yoga classes in Leicester.",
}

/**
 * Social accounts. Only entries with a url are rendered, so TikTok and YouTube
 * appear across the site the moment their links are filled in here.
 */
export const SOCIALS: { id: 'instagram' | 'facebook' | 'tiktok' | 'youtube'; label: string; url: string | null }[] = [
  { id: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/sattvalifeyoga/' },
  { id: 'facebook', label: 'Facebook', url: 'https://www.facebook.com/sattvalifeyoga' },
  { id: 'tiktok', label: 'TikTok', url: null },
  { id: 'youtube', label: 'YouTube', url: null },
]

/**
 * Instagram posts for the community grid. Supply 4 images plus their post links
 * and the grid renders; until then the section shows the follow links alone.
 */
export const COMMUNITY_POSTS: { image: string; url: string; alt: string }[] = []

export const RATING = {
  value: 5.0,
  total: 62,
  googleUrl: 'https://www.google.com/maps/search/?api=1&query=Sattvalife+Yoga+Leicester',
}

export const WELCOME = {
  title: 'Welcome to Sattvalife Yoga',
  body: 'Sattvalife offers personalised yoga classes in Leicester, suitable for small groups and individuals. We also work with companies and corporate to integrate wellness practices into the workplace. We believe yoga has the power to improve anyone’s quality of life, regardless of age or physical ability. We endeavour to learn more about our students and offer them a personalised yoga class that fits their schedule, needs and abilities. Our core objective is to spread awareness among everyone and share its boundless boon.',
}

export const VINYASA = {
  title: 'About Vinyasa Yoga',
  body: "Vinyasa, also called flow because of the smooth way that the poses run together, is one of the most popular contemporary styles of yoga. It's a broad classification that encompasses many different types of yoga, including Ashtanga and power yoga. Yoga is a great activity for you if you have diabetes, high blood pressure, high cholesterol, or heart disease. It gives you strength, flexibility, and mind-body awareness.",
  pillars: [
    {
      title: 'Mindfulness',
      text: 'Experience mind-body awareness, the quality of being in the now, a sense of freedom, of perspective, of being connected.',
    },
    {
      title: 'Discover yourself',
      text: 'Connect to your inner Self through Vinyasa (flow) and identify the part of you that is stronger than the outside world.',
    },
    {
      title: 'Meditation',
      text: 'Close each practice in stillness. Guided breath and relaxation settle the mind, so the calm stays with you long after class.',
    },
  ],
}

export const JOURNEY = {
  quote: 'Yoga reminds me that everything is connected so we must live, act, and breathe with awareness.',
  title: 'Find What Feels Good',
  body: [
    'Workout fads come and go, but virtually no other exercise program is as enduring as yoga. It’s been around for more than 5,000 years.',
    'Yoga does more than burn calories and tone muscles. It’s a total mind-body workout that combines strengthening and stretching poses with deep breathing and meditation or relaxation.',
  ],
  stats: ['Breathing', 'Metabolism', 'Flexibility', 'Toned Muscles'],
}

export interface Course {
  id: 'dropIn' | 'monthly' | 'corporate'
  name: string
  price: number
  unit: string
  blurb: string
  features: string[]
  focus: string[]
  benefits: string[]
  popular?: boolean
  stripePriceId?: string
}

export const COURSES: Course[] = [
  {
    id: 'dropIn',
    name: 'Drop-In Class',
    price: 10,
    unit: 'per class',
    blurb: 'Try a class, or come when it suits you. Join any group session in Oadby or Thurnby.',
    features: [
      'Any scheduled group class',
      'Small groups, individual attention',
      'All ages and physical abilities',
      'Mats and props provided',
    ],
    focus: ['Back', 'Belly', 'Breath'],
    benefits: ['Improved back strength', 'Toned belly & improved digestion', 'Deeper, relaxed, corrective breathing'],
  },
  {
    id: 'monthly',
    name: 'Monthly Flow',
    price: 35,
    unit: 'per month',
    blurb: 'Our most-loved plan. Practise every week and build a habit that lasts, with guidance tailored to you.',
    features: [
      'All weekly group classes',
      'Personalised to your needs and abilities',
      'Priority booking at both venues',
      'Wellness tips and habit-building support',
    ],
    focus: ['Back', 'Belly', 'Breath'],
    benefits: ['Improved back strength', 'Toned belly & improved digestion', 'Deeper, relaxed, corrective breathing'],
    popular: true,
  },
  {
    id: 'corporate',
    name: 'Sattvalife@Work',
    price: 250,
    unit: 'per session',
    blurb: 'Yoga at your workplace. Wellbeing sessions your team will actually look forward to.',
    features: [
      'On-site or online team sessions',
      'Workshops and webinars with expert teachers',
      'Chair ergonomics and desk-stretch routines',
      'Programmes tailored to your team',
    ],
    focus: ['Team wellbeing', 'Posture', 'Stress relief'],
    benefits: ['Consistent, tangible results', 'Happier, more productive workforce', 'Long-term habit-building'],
  },
]

export interface Venue {
  id: 'tue' | 'thu'
  day: string
  /** 0 = Sunday … 6 = Saturday */
  dayIndex: number
  hall: string
  area: string
  postcode: string
  /** 24h local time, HH:mm */
  start: string
  end: string
  mapsUrl: string
}

export const TIMETABLE: { title: string; subtitle: string; venues: Venue[] } = {
  title: 'Class Timetable',
  subtitle: 'Join our program',
  venues: [
    {
      id: 'tue',
      day: 'Tuesday',
      dayIndex: 2,
      hall: 'Trinity Methodist Church',
      area: 'Oadby',
      postcode: 'LE2 5AB',
      start: '18:30',
      end: '19:30',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Trinity+Methodist+Church+Oadby+LE2+5AB',
    },
    {
      id: 'thu',
      day: 'Thursday',
      dayIndex: 4,
      hall: 'Thurnby Memorial Hall',
      area: 'Thurnby',
      postcode: 'LE7 9PN',
      start: '19:00',
      end: '20:00',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Thurnby+Memorial+Hall+LE7+9PN',
    },
  ],
}

export interface ClassEntry {
  id: 'tue' | 'thu'
  name: string
  blurb: string
  audience: string
  venueId: Venue['id']
  price: number
  priceNote: string
}

/** One row per weekly class on the merged Classes & Timetable page. */
export const CLASSES: ClassEntry[] = [
  {
    id: 'tue',
    name: 'Tuesday Evening Flow',
    blurb: 'A steady Vinyasa flow to unwind midweek, working through back, belly and breath and closing in guided stillness.',
    audience: 'All levels, beginners welcome',
    venueId: 'tue',
    price: 10,
    priceNote: 'drop in, or included in Monthly Flow',
  },
  {
    id: 'thu',
    name: 'Thursday Evening Flow',
    blurb: 'The same personal approach in a slightly shorter hour. Poses are adapted for every body, whatever your age or ability.',
    audience: 'All levels, beginners welcome',
    venueId: 'thu',
    price: 10,
    priceNote: 'drop in, or included in Monthly Flow',
  },
]

export interface Instructor {
  name: string
  role: string
  image: string
  imageSmall: string
  quote: string
  bio: string
}

export const INSTRUCTORS: Instructor[] = [
  {
    name: 'Amisha Soni',
    role: 'Founder, Yoga & Fitness Instructor',
    image: '/images/opt/amisha-800.webp',
    imageSmall: '/images/opt/amisha-480.webp',
    quote: 'Yoga changed my life by helping me fall in love with my imperfect self.',
    bio: 'As a teenager I was already pondering upon the meaning of life. My curiosity towards life and a constant push from my father led me to learn yoga for my personal development. Little did I know that I will take it up as a full time profession immediately after completing my degree. Yoga changed my life by helping me fall in love with my imperfect self, discover my inner strength and truly appreciate everything in and around me. With a strong desire to share this knowledge and to help people discover their inner strength, I created Sattvalife yoga where people can trek on a journey of self discovery like never before. Come and join me in this journey!',
  },
  {
    name: 'Nish Soni',
    role: 'Yoga Instructor',
    image: '/images/opt/nish-800.webp',
    imageSmall: '/images/opt/nish-480.webp',
    quote: 'Surrender yourself completely and discover the complete you.',
    bio: 'I discovered my inner self through yoga amidst the hustle of metro city life. Yoga did not only help me overcome the everyday stress but also inspired me to continue spreading this great practice to help achieve solace with one’s own being. Yoga is a complete alignment of mind, body and soul through a series of physical postures, breathing techniques and meditation. Sattvalife inspires one for a lifestyle change leading into a positive and enlightened life ahead.',
  },
]

export const CORPORATE = {
  title: 'Sattvalife @Work',
  tagline: 'Get traditional with yoga. It works at the workplace too.',
  body: 'At Sattvalife we take great pride in helping companies embrace a fitness culture amongst their employees with the help of regular yoga sessions within the company premises. Our yoga instructors are very popular with companies who want regular yoga sessions for their employees. We recently started conducting sessions for the employees of UK-based company NEXT in Leicester. Our sessions amp up with hybrid stretches and relaxation techniques that help desk-bound employees banish aches and pains, and understand chair ergonomics and fitness tips for daily office routines.',
  offersTitle: 'What we offer',
  offersIntro: 'Quality teaching and knowledge sharing of age-old, proven techniques for physical and mental wellbeing at work, through:',
  offers: [
    'Specialised online programs for employees',
    'Workshops and webinars with expert teachers from India',
    'Well-tailored programmes',
    'Regular & traditional yoga practice',
    'Attention to physical, mental & emotional well-being',
    'Focus on long term habit-building, not short-term promises',
    'Consistent, tangible results in workforce happiness and productivity',
  ],
  images: [
    { src: '/images/opt/office-session-2-1600.webp', small: '/images/opt/office-session-2-800.webp', alt: 'A Sattvalife yoga session with an office team, everyone in prayer pose at their desks', w: 1600, h: 1200 },
    { src: '/images/opt/office-session-1-1024.webp', small: '/images/opt/office-session-1-640.webp', alt: 'Amisha leading a hybrid office yoga class, with remote colleagues joining on screen', w: 1024, h: 768 },
  ],
}

/** Real Google reviews as published on sattvalife.yoga (verified). */
export interface Review {
  author: string
  rating: number
  text: string
  context?: string
}

export const REVIEWS: Review[] = [
  {
    author: 'Sally Cook',
    rating: 5,
    context: 'Office yoga for her legal team',
    text: "Amisha does lovely seated yoga classes at our office for our team of very busy lawyers. It's a perfect lunchtime reset and I always feel more focussed and productive afterwards.",
  },
  {
    author: 'Harpreet Bhoot',
    rating: 5,
    context: 'Weekly class student',
    text: "A really good teacher and yoga class. It's helped me to be more flexible, and strengthen. I love these classes",
  },
  {
    author: 'Donna Morrell',
    rating: 5,
    context: 'Weekly class student',
    text: 'I absolutely love these sessions, they are so much fun and the feeling of relaxation and wellbeing afterwards is amazing.',
  },
  {
    author: 'Jiten Anand',
    rating: 5,
    context: 'Staff wellbeing morning',
    text: 'The team at Sattvalife Yoga delivered a wellbeing morning for our staff. It was a very relaxed start to the day and highly recommend working with them as part of your business needs! Nice way to get the team together, collectively feel relaxed and explore yoga in an easy going and light hearted way.',
  },
  {
    author: 'Maryam Behyari',
    rating: 5,
    context: 'Weekly class student',
    text: 'The sessions are really relaxing and nice, neither too hard nor too easy. I enjoy it',
  },
  {
    author: 'Laura Camila Bermúdez Jaramillo',
    rating: 5,
    text: 'It was a great session. I love Pilates and the instructor is amazing! She combines Pilates and Yoga, which is great. Thank you.',
  },
  { author: 'Al-Ameen Hassan', rating: 5, text: 'Lovely people to work with, 5 stars overall' },
  { author: 'Kate Zotova', rating: 5, text: 'Useful and fun!' },
  { author: 'Harnoor Diyal', rating: 5, text: 'Awesome' },
]

/** @deprecated kept for backwards compatibility; use REVIEWS */
export const FALLBACK_REVIEWS = REVIEWS

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  author: string
  image: string
  tags: string[]
  content: string[]
}

export const FOCUS_AREAS = {
  title: '3 Key Focus Areas',
  areas: ['Back', 'Belly', 'Breath'],
  benefits: ['Improved back strength', 'Toned belly & improved digestion', 'Deeper, relaxed, corrective breathing'],
}

export const FAQS: { q: string; a: string }[] = [
  {
    q: 'I have never done yoga. Is this for me?',
    a: 'Yes. Classes are small and suitable for all ages and physical abilities. Amisha and Nish learn about each student and adapt every pose, so you can go at your own pace.',
  },
  {
    q: 'What should I bring?',
    a: 'Comfortable clothes you can move in and a bottle of water. Mats and props are provided. Please arrive five minutes early for your first class.',
  },
  {
    q: 'Do I need to register before my first class?',
    a: 'Please complete the short registration and health form before your first class. It tells us about any injuries or conditions so we can keep you safe.',
  },
  {
    q: 'How do I pay?',
    a: 'Book online and pay by card, Apple Pay or Google Pay on Stripe’s secure checkout. We never see or store your card details.',
  },
  {
    q: 'What if I can’t make it?',
    a: 'Let us know at least 24 hours before class and we will credit or rebook your session. Monthly plans can be cancelled at any time before the next billing date.',
  },
  {
    q: 'Can under-18s join?',
    a: 'Yes, with a parent or guardian’s consent. They will need to sign the registration form on the young person’s behalf.',
  },
]

export interface EventOffering {
  title: string
  text: string
  image?: string
}

/** What Sattvalife can host beyond the weekly timetable. Enquiry-based, no fixed dates. */
export const EVENT_OFFERINGS: EventOffering[] = [
  {
    title: 'Workplace wellbeing mornings',
    text: 'A relaxed, light-hearted start to the day that brings your team together. Gentle movement, breathwork and relaxation, delivered at your office.',
    image: '/images/opt/office-session-2-800.webp',
  },
  {
    title: 'Seated & desk yoga',
    text: 'A lunchtime reset for busy teams. Chair-based stretches that ease desk aches and leave people focused for the afternoon.',
    image: '/images/opt/office-session-1-640.webp',
  },
  {
    title: 'Private & small-group classes',
    text: 'One-to-one or with friends and family, planned around your schedule, needs and abilities. At home, in a garden or a venue of your choice.',
    image: '/images/opt/garden-3-500.webp',
  },
  {
    title: 'Pop-up classes & workshops',
    text: 'Community groups, schools, charities and venues across Leicestershire. Tell us about your space and audience and we will shape the session.',
    image: '/images/opt/garden-2-500.webp',
  },
]

export const REGISTRATION_FORM = {
  fields: [
    { label: 'Registering for', type: 'radio', options: ['Self', 'Someone else'] },
    { label: 'Have you practiced yoga before?', type: 'radio', options: ['Yes', 'No'] },
    { label: 'If yes specify when and how long for?', type: 'text' },
    { label: 'Any past surgeries or illness not mentioned?', type: 'text' },
    { label: 'Additional notes / information', type: 'textarea' },
  ],
  painAreas: ['Neck', 'Shoulders', 'Elbows', 'Hands', 'Wrists', 'Hips', 'Lower Back', 'Upper Back', 'Knees', 'Feet', 'Other'],
  waiver: [
    "If at any time during the class, you feel discomfort or strain, gently come out of the posture. You may rest at anytime during the class. It is important in yoga that you listen to your body, and respect its limits on any given day.",
    "I understand that yoga is not a substitute for medical attention, examination, diagnosis, or treatment. I should consult a physician prior to beginning any activity program, including yoga. I recognise that it is my responsibility to notify my teacher of any serious illness or injury before yoga class. I will not perform any postures to the extent of the strain or pain.",
    "I accept that neither the instructor, nor the hosting facility, is liable for any injury, or any damages, to person or property, resulting from the taking of the class. Those under 18 years of age must have this form signed by a parent or guardian.",
  ],
  photoConsent: 'I give consent for any pictures or videos taken during the class to be used for Sattvalife Yoga promotion.',
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: '3-quick-yoga-asanas-for-back-pain',
    title: '3 Quick Yoga Asanas to Get Relief from Back Pain',
    excerpt: 'Sitting is the new smoking. Learn three powerful yoga poses to counter the effects of prolonged desk work.',
    date: '2022-06-30',
    author: 'Amisha Soni',
    image: '/images/opt/studio-triangle-1376.webp',
    tags: ['Back Pain', 'Asanas'],
    content: [
      '"Sitting is the new smoking." The phrase captures the hidden cost of our desk-bound lives. Prolonged sitting affects more than your eyesight; it impacts posture, metabolism, and mental health, increasing risks of anxiety, depression, and obesity.',
      'Poor posture is directly linked to back pain, cardiovascular problems, digestive issues, and gradual spinal changes that only worsen over time. Yoga offers a natural, effective countermeasure.',
      'Here are three powerful asanas to incorporate into your daily routine:',
      '1. Adho Mukha Svanasana (Downward-Facing Dog): This inversion stretches the spine, hamstrings, and calves while strengthening the shoulders and arms. It relieves back tension by lengthening the entire posterior chain.',
      '2. Marjaryasana (Cat/Cow Pose): A gentle flow between arching and rounding the spine that mobilises the vertebrae, releases tension in the back and neck, and massages the digestive organs.',
      '3. Trikonasana (Triangle Pose): This standing pose opens the hips, stretches the hamstrings, and strengthens the legs while lengthening the side body and improving spinal alignment.',
      'By strengthening and stretching the shoulders, chest, back, and abdominals (the areas most impacted by prolonged sitting), these poses help you stand taller, live with an open heart, and find relief from the discomfort of poor posture.',
    ],
  },
  {
    slug: 'yoga-and-meditation',
    title: 'Yoga and Meditation',
    excerpt: 'Discover how meditation complements your yoga practice and why it matters for mental clarity and wellbeing.',
    date: '2024-03-27',
    author: 'Amisha Soni',
    image: '/images/opt/daisies-1200.webp',
    tags: ['Meditation', 'Mindfulness'],
    content: [
      'Yoga and meditation have become increasingly popular in the Western world, with practitioners praising their psychological and physical benefits. Current research suggests these ancient practices can boost overall well-being and resilience to stress factors.',
      'Meditation is one of the main principles of yoga: a reliable method for achieving mental clarity and health. There are various meditation exercises designed for both advanced and beginner yoga students. It is essential to carefully analyse each technique to maximise results.',
      'Contrary to popular belief, meditation is not something that "comes naturally and cannot be taught." Timing matters: meditate either in the morning or late in the evening, when the atmosphere is charged with a high level of spiritual energy.',
      'Six tips for effective meditation: (1) Free your mind of all worries before starting. (2) Find a quiet place where you are not likely to be disturbed. (3) Choose the same time and same place for your routine. (4) Focus on meditation; do not let your mind wander. (5) Follow a pattern when breathing. (6) Keep your head, back, and neck in a perfect straight line.',
      'The essential practice is both to perform meditation sessions and to observe the results. This is how we approach the supreme synchronisation between body and spirit.',
    ],
  },
  {
    slug: 'empowering-children-through-yoga',
    title: 'Empowering Children Through Yoga',
    excerpt: 'Children face immense stress too. Yoga gives them tools for self-health, relaxation, and inner fulfilment.',
    date: '2024-03-27',
    author: 'Amisha Soni',
    image: '/images/opt/kids-yoga-460.webp',
    tags: ['Children', 'Family'],
    content: [
      'Children today face significant stress from school pressures, incessant lessons, video games, competitive sports, and the digital world. Like adults, they can benefit immensely from yoga, learning techniques for self-health, relaxation, and inner fulfilment that help them navigate challenges with greater ease.',
      'Yoga at a young age encourages self-esteem and body awareness through a non-competitive physical activity. Here are seven key benefits:',
      '1. Anxiety relief: Yoga helps children manage anxious feelings through breathing and movement.',
      '2. Stress management: Breathing exercises and relaxation techniques taught in class help kids handle stress. Learning healthy stress reduction is a life skill that serves them as children and adults.',
      '3. Self-esteem boost: Mastering poses and improving balance gives children a genuine sense of empowerment.',
      '4. Body awareness and mindfulness: Various poses teach children about their bodies and what movements they can perform.',
      '5. Concentration and memory: Different moves require focus and memorisation, which translates into academic performance.',
      '6. Strength, coordination, and flexibility: Yoga strengthens growing bodies and reduces injury risk.',
      '7. Discipline and reduced impulsivity: Yoga provides a physical outlet for self-expression and teaches discipline through clearing the mind and perfecting poses.',
      'Children are natural yogis. Their innate trust and lack of inhibitions allow them to receive the teachings of yoga and grow from them in truly inspiring ways.',
    ],
  },
]
