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
          <img src="/images/logo.png" alt="Sattvalife Yoga" className="h-16 w-auto opacity-80" />
          <h1 className="text-2xl font-semibold text-forest-800">Oops — something went wrong</h1>
          <p className="text-forest-600 max-w-xs text-sm">
            The page couldn't load. Please try refreshing or clearing your browser cache.
          </p>
          <button
            onClick={() => { window.location.href = '/' }}
            className="rounded-xl bg-forest-600 px-6 py-3 text-cream-50 font-semibold text-sm shadow-md"
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
