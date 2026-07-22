import { recordPageView, getVisitorJourney } from '@/lib/analytics/visitorJourney'

describe('visitorJourney', () => {
  beforeEach(() => {
    window.sessionStorage.clear()
  })

  it('returns null when nothing recorded', () => {
    expect(getVisitorJourney()).toBeNull()
  })

  it('records an ordered path and captures the landing page', () => {
    recordPageView('/usabo-coaching-california')
    recordPageView('/usabo-coaching-orange-county')
    recordPageView('/usabo-6-month-prep-plan')

    const j = getVisitorJourney()
    expect(j).not.toBeNull()
    expect(j!.landingPage).toBe('/usabo-coaching-california')
    expect(j!.path).toEqual([
      '/usabo-coaching-california',
      '/usabo-coaching-orange-county',
      '/usabo-6-month-prep-plan',
    ])
    expect(j!.pageCount).toBe(3)
  })

  it('dedupes consecutive repeats (e.g. re-render on the same route)', () => {
    recordPageView('/usabo-coaching')
    recordPageView('/usabo-coaching')
    recordPageView('/usabo-coaching')
    expect(getVisitorJourney()!.path).toEqual(['/usabo-coaching'])
  })

  it('caps the path length (keeps the most recent pages)', () => {
    for (let i = 0; i < 40; i++) recordPageView(`/p${i}`)
    const j = getVisitorJourney()!
    expect(j.path.length).toBe(25)
    expect(j.path[j.path.length - 1]).toBe('/p39')
    // landing page is preserved even after the cap trims early pages
    expect(j.landingPage).toBe('/p0')
  })

  it('never throws when sessionStorage is unavailable', () => {
    const spy = jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked')
    })
    expect(() => recordPageView('/x')).not.toThrow()
    expect(getVisitorJourney()).toBeNull()
    spy.mockRestore()
  })
})
