import Link from 'next/link'
import {
  Cloud,
  Rocket,
  BarChart3,
  CloudFog,
  CloudAlert,
  CloudCog,
  User,
  Lock,
  Bell,
  Key,
  FileText,
  LayoutDashboard,
  BarChart2,
  Users,
  MessageCircle,
  CheckCircle,
  Loader2,
  Mail,
  Settings2,
  Globe,
  Zap,
  Loader,
} from 'lucide-react'
import Header from '@/components/custom/header'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const features = [
  {
    icon: User,
    label: 'Authentication',
    des: 'No need to manually handle email/password. Users can sign up instantly using Google or other providers.',
  },
  {
    icon: Lock,
    label: 'Data Encrypted',
    des: 'All user data, including API keys and tokens, is securely encrypted to ensure privacy and protection.',
  },
  {
    icon: Bell,
    label: 'Notification System',
    des: 'Automatically notify users if an email fails to send or if any issues occur during delivery.',
  },
  {
    icon: Key,
    label: 'Secure Key Support',
    des: 'Generate unique, secure API keys for each user, enabling safe access to PostCloud from external apps.',
  },
  {
    icon: FileText,
    label: 'Control Email Logs',
    des: 'Easily monitor sent emails, track delivery status, and manage logs directly from the dashboard.',
    dev: true,
  },
  {
    icon: LayoutDashboard,
    label: 'Ready-Made Email Templates',
    des: 'Pre-built email templates for common use cases like notifications, welcome emails, or password resets.',
    dev: true,
  },
  {
    icon: BarChart2,
    label: 'Analytics & Insights',
    des: 'Visualize usage stats, success rates, and delivery trends with built-in analytics charts.',
    dev: true,
  },
  {
    icon: Users,
    label: 'Multi-Tenant Support',
    des: 'Support multiple domains or projects under one account, making it ideal for teams and agencies.',
    dev: true,
  },
  {
    icon: MessageCircle,
    label: 'Customizable Rate Limits',
    des: 'Set limits on email sending to avoid abuse and maintain compliance with Gmail API restrictions.',
    dev: true,
  },
]

const howToUseIt = [
  {
    icon: User,
    label: 'Select Account Provider',
    des: 'Choose your preferred provider to sign up. Recommended: Google for Gmail integration.',
  },
  {
    icon: CheckCircle,
    label: 'Verify Profile Info',
    des: 'Confirm your name, email, and profile details. You can keep defaults or customize them.',
  },
  {
    icon: Loader,
    label: 'Creating Account',
    loading: true,
  },
  {
    icon: Settings2,
    label: 'Select Authentication Method',
    des: 'Pick how you want your project to authenticate with PostCloud API.',
  },
  {
    icon: Globe,
    label: 'Provide Project Details',
    des: 'Enter your project name, description, and other relevant info for organization.',
  },
  {
    icon: Key,
    label: 'Generate Secure API Key',
    des: 'Create a secure API key or use your own custom key to safely access PostCloud from your project.',
  },
  {
    icon: Loader,
    label: 'Setting up Nodemailer',
    loading: true,
  },
  {
    icon: Mail,
    label: 'Test Email Integration',
    des: 'Send a quick test email to ensure everything is connected and working properly.',
  },
  {
    icon: Zap,
    label: 'Setup Complete',
    des: 'You’re all set! Start sending emails from your frontend project or explore advanced features.',
  },
]

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* <Header /> */}
      <section className="flex flex-col items-center text-center">
        <h1 className="text-[17rem] font-mac bg-gradient-to-r from-zinc-900 via-stone-700 to-neutral-500 inline-block text-transparent bg-clip-text">
          PostCloud
        </h1>
        <p className="text-xl font-normal text-neutral-400 -mt-17 w-4xl">
          PostCloud is a simple yet powerful email delivery service built on top
          of Nodemailer. It empowers frontend developers to send emails
          directly—without writing or managing any backend code. Secure, fast,
          and developer-friendly.
        </p>
        <div className="flex items-center gap-3.5 mt-7.5">
          <Button>
            Get Start <CloudFog />
          </Button>
          <Button variant={'ghost'}>
            Show how it work ? <CloudAlert />{' '}
          </Button>
        </div>
      </section>
      <div className="max-w-6xl mx-auto">
        <section className="mt-36 flex flex-col">
          <h3 className="text-3xl text-center font-normal text-muted-foreground">
            PostCloud Features at a Glance
          </h3>
          <p className="w-md mx-auto text-center text-sm text-muted-foreground mt-2">
            Discover the tools that make sending emails from your frontend
            effortless and secure.
          </p>

          <div className="mt-11">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {features.map((f, i) => (
                <Card
                  key={i}
                  className="w-fit duration-300 hover:scale-105 hover:-translate-2 cursor-pointer border-0 bg-gradient-to-r from-zinc-900 to-stone-900"
                >
                  <CardContent>
                    {f.icon && <f.icon className="text-muted-foreground" />}
                    <h3 className="text-lg">{f.label}</h3>
                    <p className="text-xs font-light tracking-wide">{f.des}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card className="w-3xl h-60 mx-auto mt-7 border-0 bg-gradient-to-l from-pink-300 to-sky-300 text-black">
              <CardContent className="flex flex-col gap-1 items-center justify-center h-full text-center">
                <CloudAlert size={45} strokeWidth={1} />
                <h3 className="text-lg">Feedback</h3>
                <p className="text-sm font-normal tracking-wide mb-3 ">
                  Have an idea or suggestion? Reach out to us and help shape the
                  future of PostCloud.
                </p>
                <Button className="dark:bg-muted dark:text-primary">
                  Feedback <MessageCircle />
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
        <section className="mt-36 flex flex-col">
          <h3 className="text-3xl text-center font-normal text-muted-foreground">
            Step-by-Step Guide to PostCloud
          </h3>
          <p className="w-md mx-auto text-center text-sm text-muted-foreground mt-2">
            Follow these steps to connect your account and start sending emails
            instantly.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-15">
            {howToUseIt.map((htui, i) => (
              <Card
                key={i}
                className="w-full h-44 duration-300 hover:scale-105 hover:-translate-2 cursor-pointer border-0 bg-gradient-to-r from-neutral-900 to-zinc-800"
              >
                <CardContent
                  className={`flex flex-col gap-1 justify-center h-full ${
                    htui.loading && 'items-center'
                  }`}
                >
                  <htui.icon
                    size={htui.loading ? 31 : 25}
                    className={`duration-300 ${htui.loading && 'animate-spin'}`}
                  />
                  <h3
                    className={`text-lg ${
                      htui.loading && 'text-muted-foreground'
                    }`}
                  >
                    {htui.label}
                  </h3>
                  <p className="text-xs font-light tracking-wide">{htui.des}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
      <footer className="h-32 mt-20"></footer>
    </main>
  )
}
