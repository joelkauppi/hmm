import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent  } from '@testing-library/react'
import BlogForm from './BlogForm'

let component
let blog
let mockHandler

beforeEach(() => {
    mockHandler = jest.fn()

    blog = {
        title: 'title',
        author: 'author',
        url: 'url',
    }

    component = render(
        <BlogForm createBlog={mockHandler}/>
    )
}
)


test('Should fill the form and submit.', async () => {
  const authorInput = component.container.querySelector('#author')
  const titleInput = component.container.querySelector('#title')
  const urlInput = component.container.querySelector('#url')

  const form = component.container.querySelector('form')

  fireEvent.change(authorInput, {
      target: { value: blog.author }
  })
  fireEvent.change(titleInput, {
    target: { value: blog.title }
  })
  fireEvent.change(urlInput, {
    target: { value: blog.url }
  })
  fireEvent.submit(form)
  
  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0].author).toBe(blog.author)
  expect(mockHandler.mock.calls[0][0].title).toBe(blog.title)
  expect(mockHandler.mock.calls[0][0].url).toBe(blog.url)

})
