import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

// Keep the test lightweight by mocking the bigger UI bits.
vi.mock('./components/Navbar', () => ({
  default: () => <div>Navbar</div>,
}))
vi.mock('./pages/News', () => ({
  default: () => <div>News</div>,
}))

// The app imports ThemeContext from file; we can still use the real provider.
import { ThemeProvider } from './context/ThemeContext'
import App from './App'

describe('App', () => {
  it('renders the main layout', () => {
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>,
    )

    expect(screen.getByText('Navbar')).toBeInTheDocument()
    expect(screen.getByText('News')).toBeInTheDocument()
  })
})
