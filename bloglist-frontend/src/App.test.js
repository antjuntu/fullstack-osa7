import React from 'react'
import { render, waitForElement } from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  let component

  beforeEach(() => {
    component = render(
      <App />
    )
  })

  it('if no user logged, notes are not rendered', async () => {
    component.rerender(<App />)

    await waitForElement(() => component.getByText('login'))

    expect(component.container).toHaveTextContent('login')
    expect(component.container).toHaveTextContent('log in to application')
    expect(component.container).toHaveTextContent('username')
    expect(component.container).toHaveTextContent('password')
    expect(component.container).not.toHaveTextContent('Dan Abramov')
  })

  it('if user is logged in, blogs are rendered', async () => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Teuvo Testaaja'
    }

    localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

    component.rerender(<App />)

    await waitForElement(() => component.getByText('create'))

    expect(component.container).not.toHaveTextContent('username')
    expect(component.container).not.toHaveTextContent('password')
    expect(component.container).toHaveTextContent('Dan Abramov')
    expect(component.container).toHaveTextContent('Martin Fowler')
  })
})