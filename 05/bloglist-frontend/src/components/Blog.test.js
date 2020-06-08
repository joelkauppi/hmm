import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent  } from '@testing-library/react'
import Blog from './Blog'

let component
let mockHandler

beforeEach(() => {
    mockHandler = jest.fn()

    const blog = {
        title: 'title',
        author: 'author',
        url: 'url',
        likes: 4
    }

    component = render(
        <Blog blog={blog} buttonHideLabel='Hide' buttonShowLabel='Show details' addLike={mockHandler}/>
    )
}
)


test('Should show only title and author by default', async () => {
    const titleArea = component.getByText('title')
    const authorArea = component.getByText('author')
    const urlArea = component.getByText('url')
    const likesArea = component.getByText('4')
    expect(titleArea).toBeDefined
    expect(authorArea).toBeDefined
    expect(urlArea).toBeUndefined
    expect(likesArea).toBeUndefined  
})

test('Should show all data when show details is toggled.', () => {

    const button = component.getByText('Show details')
    fireEvent.click(button)

    const titleArea = component.getByText('title')
    const authorArea = component.getByText('author')
    const urlArea = component.getByText('url')
    const likesArea = component.getByText('4')
    expect(titleArea).toBeDefined
    expect(authorArea).toBeDefined
    expect(urlArea).toBeDefined
    expect(likesArea).toBeDefined  

})

test('should call handleLike function twice', () => {
    const button = component.getByText('Like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)

})