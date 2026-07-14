import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, ChevronRight, Leaf } from "lucide-react";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Blog | Sattvalife Yoga",
  description: "Explore yoga tips, wellness advice, and insights from the Sattvalife Yoga team. Back pain relief, children's yoga, meditation, and more.",
  openGraph: {
    title: "Sattvalife Yoga Blog",
    description: "Yoga tips, wellness advice, and insights from Leicester's Sattvalife Yoga team.",
    type: "website",
    locale: "en_GB",
    siteName: "Sattvalife Yoga",
  },
};

const blogPosts = [
  {
    slug: "3-quick-yoga-asanas-to-get-relief-from-back-pain",
    title: "3 Quick Yoga Asanas to Get Relief from Back Pain",
    excerpt: "Back pain is one of the most common complaints in our modern, desk-bound world. These three gentle yoga poses can provide quick relief and long-term strength for your spine.",
    date: "15 March 2024",
    readTime: "4 min read",
    category: "Wellness",
    tags: ["back pain", "yoga asanas", "spinal health"],
    author: "Amisha Soni",
  },
  {
    slug: "conclusion-empowering-children-through-yoga",
    title: "Conclusion: Empowering Children through Yoga",
    excerpt: "Yoga offers profound benefits for children — from improved focus and emotional regulation to physical strength and confidence. Here's why every child should experience yoga.",
    date: "28 February 2024",
    readTime: "5 min read",
    category: "Children's Yoga",
    tags: ["children", "kids yoga", "education"],
    author: "Nish Soni",
  },
  {
    slug: "yoga-and-meditation",
    title: "Yoga and Meditation",
    excerpt: "Discover the powerful synergy between yoga and meditation. Learn how combining asana practice with meditation can deepen your practice and transform your wellbeing.",
    date: "10 January 2024",
    readTime: "6 min read",
    category: "Meditation",
    tags: ["meditation", "mindfulness", "yoga practice"],
    author: "Amisha Soni",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <Header />

      <main className="flex-1">
        <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-primary-50 via-background to-accent-50 pt-24">
          <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] opacity-5" aria-hidden="true" />
          <div className="relative container mx-auto px-4 py-20">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
                <Leaf className="h-4 w-4" />
                Our Blog
              </div>
              <h1 className="font-display text-5xl md:text-7xl font-semibold tracking-tight text-foreground mb-6">
                Yoga & <span className="text-primary">Wellness</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Tips, insights, and inspiration from the Sattvalife team to support your yoga journey.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto space-y-8">
              {blogPosts.map((post, index) => (
                <Card key={post.slug} className="overflow-hidden transition-all duration-300 hover:shadow-xl border-border hover:border-primary/30">
                  <CardContent className="p-0">
                    <div className="md:flex">
                      <div className="md:w-1/3 bg-gradient-to-br from-primary/10 to-accent/5 min-h-[200px] flex items-center justify-center">
                        <Leaf className="h-16 w-16 text-primary/30" />
                      </div>
                      <div className="p-6 md:p-8 md:w-2/3">
                        <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
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
                        <h2 className="font-display text-2xl md:text-3xl font-semibold mb-3">
                          <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors no-underline">
                            {post.title}
                          </Link>
                        </h2>
                        <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">By {post.author}</span>
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/blog/${post.slug}`}>
                              Read More <ChevronRight className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
