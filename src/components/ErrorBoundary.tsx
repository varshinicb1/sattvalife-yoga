import { Component, type ReactNode } from 'react'

interface Props { children: ReactNode }
interface State { hasError: boolean; message: string }

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, message: '' }
  }

  static getDerivedStateFromError(err: Error): State {
    return { hasError: true, message: err?.message ?? 'Something went wrong.' }
  }

  componentDidCatch(err: Error, info: { componentStack: string }) {
    console.error('[Sattvalife ErrorBoundary]', err, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-cream-50 px-6 text-center gap-6">
          <img src="/images/logo.png" alt="Sattvalife Yoga" width={800} height={439} className="h-20 w-auto" />
          <h1 className="text-4xl text-ink-900">Something went wrong</h1>
          <p className="text-forest-600 max-w-xs text-sm">
            This page could not load. Please refresh, or head back to the home page.
          </p>
          <button
            onClick={() => { window.location.href = '/' }}
            className="btn-primary"
          >
            Go to Home
          </button>
          {import.meta.env.DEV && (
            <pre className="text-xs text-red-600 bg-red-50 rounded-lg p-3 max-w-sm text-left overflow-auto">
              {this.state.message}
            </pre>
          )}
        </div>
      )
    }
    return this.props.children
  }
}
