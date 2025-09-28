import { render } from '@testing-library/react'
import { ExampleWorkflowDemo } from '../../../components/ui/ExampleWorkflowDemo/ExampleWorkflowDemo'

describe('ExampleWorkflowDemo', () => {
  it('should render without crashing', () => {
    render(<ExampleWorkflowDemo />)
    expect(screen.getByText(/New Workflow Demonstration/i)).toBeInTheDocument()
  })

  it('should accept custom className', () => {
    const { container } = render(<ExampleWorkflowDemo className="custom-class" />)
    const element = container.firstChild
    expect(element).toHaveClass('custom-class')
  })

  it('should render children when provided', () => {
    render(<ExampleWorkflowDemo>Test content</ExampleWorkflowDemo>)
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })
})
