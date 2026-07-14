import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ChevronLeft, User } from "lucide-react";

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ slug: string }>;
}

const blogPosts = {
  "3-quick-yoga-asanas-to-get-relief-from-back-pain": {
    title: "3 Quick Yoga Asanas to Get Relief from Back Pain",
    date: "15 March 2024",
    readTime: "4 min read",
    author: "Amisha Soni",
    category: "Wellness",
    content: [
      {
        heading: "Introduction",
        body: "Back pain is one of the most common complaints in our modern, desk-bound world. Whether you spend hours hunched over a computer or suffer from poor posture, back pain can significantly impact your quality of life. The good news is that yoga offers gentle, effective solutions. Here are three yoga asanas that can provide quick relief and long-term strength for your spine.",
      },
      {
        heading: "1. Cat-Cow Pose (Marjaryasana-Bitilasana)",
        body: "This gentle flowing movement warms up the spine and releases tension in the back and neck. Start on your hands and knees in a tabletop position. As you inhale, drop your belly, lift your chin and chest, and gaze up (Cow Pose). As you exhale, round your spine, tuck your chin to your chest, and draw your navel in (Cat Pose). Repeat for 10-15 slow breaths, synchronising movement with your breath. This dynamic sequence improves spinal flexibility, massages the digestive organs, and relieves lower back tension.",
      },
      {
        heading: "2. Child's Pose (Balasana)",
        body: "A deeply restorative pose that gently stretches the lower back, hips, and thighs. From kneeling, sit back on your heels and fold forward, extending your arms in front or resting them alongside your body. Allow your forehead to rest on the mat. Breathe deeply into your back body, feeling the expansion with each inhalation and release with each exhalation. Stay here for 1-3 minutes. Child's Pose is excellent for releasing tension after a long day or between more active poses. It calms the nervous system and gently realigns the spine.",
      },
      {
        heading: "3. Sphinx Pose (Salamba Bhujangasana)",
        body: "A gentle backbend that strengthens the spine and opens the chest. Lie on your belly with your legs extended behind you. Place your elbows directly under your shoulders, forearms parallel, and press your palms into the mat. On an inhalation, gently lift your chest and head, keeping your lower ribs on the mat. Draw your shoulder blades down your back. Hold for 30-60 seconds while breathing deeply. Sphinx pose is particularly effective for relieving lower back discomfort and improving posture by counteracting the forward hunch of desk work.",
      },
      {
        heading: "Tips for Practice",
        body: "Always listen to your body and never push into pain. Move slowly and mindfully. For chronic back pain, consult your doctor or a physiotherapist before starting any new exercise routine. Consistency is key — even 10 minutes of daily practice can make a significant difference. Breathe deeply throughout each pose, as the breath is your most powerful tool for releasing tension.",
      },
      {
        heading: "When to Practice",
        body: "These poses can be practiced first thing in the morning to ease stiffness, during a work break to reset your posture, or in the evening to release the day's tension. Create a calm space with a yoga mat, wear comfortable clothing, and allow yourself to arrive fully in the present moment.",
      },
    ],
  },
  "conclusion-empowering-children-through-yoga": {
    title: "Conclusion: Empowering Children through Yoga",
    date: "28 February 2024",
    readTime: "5 min read",
    author: "Nish Soni",
    category: "Children's Yoga",
    content: [
      {
        heading: "The Power of Yoga for Young Minds",
        body: "As we conclude our series on children's yoga, it's clear that the benefits of yoga extend far beyond the physical. In a world where children face increasing pressures from academics, social media, and extracurricular commitments, yoga offers a sanctuary — a space to breathe, move, and simply be.",
      },
      {
        heading: "Building Emotional Resilience",
        body: "Children who practice yoga develop emotional intelligence and resilience. Through breathing techniques and mindfulness, they learn to recognise and regulate their emotions. A child who can take three deep breaths when feeling frustrated has a life skill that will serve them far beyond childhood. Yoga teaches children that emotions are transient — they come and go like clouds in the sky, and we have the power to observe them without being consumed by them.",
      },
      {
        heading: "Physical Benefits for Growing Bodies",
        body: "In an era where screen time often exceeds active play, yoga provides essential physical activity that builds strength, flexibility, and body awareness. The poses help improve posture — particularly important for children who carry heavy school bags or spend hours on devices. Yoga also enhances coordination, balance, and motor skills, supporting children's overall physical development in a fun, non-competitive way.",
      },
      {
        heading: "Improving Focus and Academic Performance",
        body: "The concentration required to hold a balance pose or follow a yoga sequence translates directly to improved focus in the classroom. Studies have shown that children who practice yoga demonstrate better attention spans, improved memory, and higher academic performance. The mindfulness aspect of yoga helps children approach their studies with a calm, focused mind rather than a frantic, anxious one.",
      },
      {
        heading: "Social Skills and Compassion",
        body: "Group yoga classes teach children important social skills — taking turns, respecting personal space, and working together. Partner poses build trust and cooperation. The philosophy of yoga, with its emphasis on kindness and compassion, helps children develop empathy for others. They learn to celebrate their unique abilities without comparing themselves to others.",
      },
      {
        heading: "A Gift for Life",
        body: "Introducing children to yoga is one of the most valuable gifts we can give them. It equips them with tools for managing stress, maintaining physical health, and cultivating inner peace. At Sattvalife, we believe that every child deserves the opportunity to discover the joy of yoga. Whether through school programmes, family classes, or dedicated children's sessions, we are committed to making yoga accessible to young people in Leicester and beyond.",
      },
    ],
  },
  "yoga-and-meditation": {
    title: "Yoga and Meditation",
    date: "10 January 2024",
    readTime: "6 min read",
    author: "Amisha Soni",
    category: "Meditation",
    content: [
      {
        heading: "The Union of Body and Mind",
        body: "Yoga and meditation are two sides of the same coin. The word 'yoga' itself means union — the union of body, mind, and spirit. While the physical postures (asanas) prepare the body for stillness, meditation trains the mind to find peace amidst the chaos of daily life. Together, they form a complete practice that nurtures every aspect of our being.",
      },
      {
        heading: "Why Combine Yoga with Meditation?",
        body: "Practicing yoga without meditation is like exercising without cooling down. The physical practice opens the body, releases tension, and moves stagnant energy. Meditation then allows us to integrate that experience, settling the mind into a state of calm awareness. When we end a yoga class with Savasana (corpse pose) or a guided meditation, we are giving ourselves the gift of integration — allowing the benefits of the practice to sink deep into our consciousness.",
      },
      {
        heading: "Simple Meditation Techniques for Beginners",
        body: "If you're new to meditation, start small. Even five minutes a day can make a significant difference. Find a comfortable seated position, close your eyes, and bring your attention to your breath. Notice the sensation of air entering and leaving your nostrils. When your mind wanders — and it will — gently bring it back to the breath without judgment. This simple practice of returning to the present moment is the essence of meditation.",
      },
      {
        heading: "Breath Awareness (Pranayama)",
        body: "Breath is the bridge between the body and mind. Pranayama, the yogic science of breath control, offers powerful techniques for regulating the nervous system. Try Nadi Shodhana (alternate nostril breathing) when you feel anxious, or Ujjayi breath (ocean breath) during your yoga practice to deepen your focus. Even something as simple as extending your exhale can activate the parasympathetic nervous system, triggering the relaxation response.",
      },
      {
        heading: "The Science Behind the Practice",
        body: "Research confirms what yogis have known for thousands of years — meditation changes the brain. Regular practice reduces activity in the amygdala (the brain's fear centre), increases grey matter in areas associated with memory and emotional regulation, and lowers cortisol levels. Combined with yoga's physical benefits, this creates a powerful intervention for stress, anxiety, and depression.",
      },
      {
        heading: "Bringing Meditation into Daily Life",
        body: "Meditation doesn't have to be limited to sitting on a cushion. Walking meditation, mindful eating, and even washing dishes with full attention are all forms of meditation. The goal is to cultivate a quality of presence that permeates every aspect of your life. At Sattvalife, we integrate meditation and breathwork into every class, giving you practical tools that you can take off the mat and into your daily life.",
      },
    ],
  },
};

export async function generateStaticParams() {
  return [
    { slug: "3-quick-yoga-asanas-to-get-relief-from-back-pain" },
    { slug: "conclusion-empowering-children-through-yoga" },
    { slug: "yoga-and-meditation" },
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts[slug as keyof typeof blogPosts];
  if (!post) return { title: "Post Not Found | Sattvalife Yoga" };
  return {
    title: `${post.title} | Sattvalife Yoga Blog`,
    description: post.content[0]?.body?.slice(0, 160) ?? "",
    openGraph: {
      title: post.title,
      description: post.content[0]?.body?.slice(0, 160) ?? "",
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      locale: "en_GB",
      siteName: "Sattvalife Yoga",
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts[slug as keyof typeof blogPosts];

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <Header />

      <main className="flex-1">
        <article className="pt-32 pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <Button variant="ghost" size="sm" asChild className="mb-8">
                <Link href="/blog">
                  <ChevronLeft className="h-4 w-4" /> Back to Blog
                </Link>
              </Button>

              <header className="mb-12">
                <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {post.readTime}
                  </span>
                </div>

                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground mb-4">
                  {post.title}
                </h1>

                <div className="flex items-center gap-2 text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
              </header>

              <div className="prose prose-gray max-w-none">
                {post.content.map((section, index) => (
                  <div key={index} className="mb-8">
                    <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-4">
                      {section.heading}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">{section.body}</p>
                  </div>
                ))}
              </div>

              <div className="mt-12 pt-8 border-t border-border">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-sm text-muted-foreground">
                    Published on {post.date} by {post.author}
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/blog">
                      <ChevronLeft className="h-4 w-4" /> More Articles
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
