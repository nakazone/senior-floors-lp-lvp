'use client'

import { Component, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  fallbackTexture: string
  fallbackUi: ReactNode
}

type State = { hasError: boolean }

export class Showroom3DErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error) {
    console.error('Showroom3D error:', error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex aspect-[3/2] w-full max-w-4xl flex-col items-center justify-center gap-3 rounded-xl bg-neutral-800 px-4">
          <p className="text-center text-neutral-400">
            3D viewer could not load. Showing preview instead.
          </p>
          <img
            src={this.props.fallbackTexture}
            alt="Floor texture preview"
            className="max-h-64 rounded-lg object-contain object-center"
          />
          {this.props.fallbackUi}
        </div>
      )
    }
    return this.props.children
  }
}
