import type { Meta, StoryObj } from '@storybook/react'
import { ExampleWorkflowDemo } from './ExampleWorkflowDemo'

const meta: Meta<typeof ExampleWorkflowDemo> = {
  title: 'UI/ExampleWorkflowDemo',
  component: ExampleWorkflowDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const WithCustomClass: Story = {
  args: {
    className: 'border-2 border-blue-500 p-4',
  },
}

export const WithChildren: Story = {
  args: {
    children: 'Custom content for ExampleWorkflowDemo',
  },
}
