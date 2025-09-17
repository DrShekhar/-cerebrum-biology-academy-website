/**
 * Basic functionality tests
 */

describe('Basic Tests', () => {
  it('should pass basic arithmetic test', () => {
    expect(2 + 2).toBe(4)
  })

  it('should handle string operations', () => {
    const str = 'Hello World'
    expect(str.toLowerCase()).toBe('hello world')
    expect(str.length).toBe(11)
  })

  it('should handle array operations', () => {
    const arr = [1, 2, 3, 4, 5]
    expect(arr.length).toBe(5)
    expect(arr[0]).toBe(1)
    expect(arr.includes(3)).toBe(true)
  })

  it('should handle object operations', () => {
    const obj = { name: 'John', age: 25 }
    expect(obj.name).toBe('John')
    expect(obj.age).toBe(25)
    expect(Object.keys(obj)).toEqual(['name', 'age'])
  })

  it('should handle async operations', async () => {
    const promise = Promise.resolve('success')
    const result = await promise
    expect(result).toBe('success')
  })
})

describe('Environment Tests', () => {
  it('should have test environment variables', () => {
    expect(process.env.NODE_ENV).toBe('test')
    expect(process.env.NEXT_PUBLIC_ENV).toBe('test')
  })

  it('should have required mocks available', () => {
    expect(jest).toBeDefined()
    expect(jest.fn).toBeDefined()
  })
})
