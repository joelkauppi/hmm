import blogs from "../../src/services/blogs"
import { mount } from 'cypress-react-unit-test'
import { Blog } from '../../src/components/Blog'
import React from 'react'
let user

describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3001/api/testing/reset')
      const user = {
          userName: 'testi',
          password: 'testsekret'
      }
      cy.request('POST', 'http://localhost:3001/api/users', user)
      cy.visit('http://localhost:3000')
    })
    describe('login',() => {
        it('form is shown', function() {
            cy.contains('login').click()
            cy.contains('username')
            cy.contains('password')
            cy.get('form')
            cy.get('#login-button')
        })
    
        it('successfully', () => {
            cy.contains('login').click()
            cy.get('#username').type('testi')
            cy.get('#password').type('testsekret')
            cy.get('#login-button').click()
    
            cy.contains('Logged in')
        })
    
        it('unsuccessful', () => {
            cy.contains('login').click()
            cy.get('#username').type('testi')
            cy.get('#password').type('wrong')
            cy.get('#login-button').click()
    
            cy.contains('Wrong username or password')
        })
    })
    

    describe('When logged in', function() {
        beforeEach(function() {
        })
        describe('one blog', () => {
            beforeEach(function() {
                cy.contains('login').click()
                cy.get('#username').type('testi')
                cy.get('#password').type('testsekret')
                cy.get('#login-button').click()
        
    
                cy.contains('New blog post').click()
                cy.get('#title').type('testblog')
                cy.get('#author').type('test author')
                cy.get('#url').type('test url')
                cy.get('#create-blog').click()
                cy.contains('Added blog')
            })
            it('A blog can be created', function() {

                cy.contains('testblog test author')
              })
      
              it('number of likes can be increased', function() {
                  cy.contains('Show details').click()
                  cy.contains('Like').click()
                  cy.contains(1)
              })
      
              it('should be possible to remove blog', () => {
                  cy.contains('Show details').click()
                  cy.contains('Remove').click()
                  cy.contains('Blog testblog removed')
              })
        })

        describe('many blogs', () => {
            beforeEach(function() {
                cy.login({ userName: 'testi', password: 'testsekret' })
                cy.addBlog({ title: 'blog 2', author: 'author 2', url: 'url 2', likes: 5 })
               
                cy.addBlog({ title: 'blog 3', author: 'author 3', url: 'url 3', likes: 3 })
                cy.addBlog({ title: 'blog 1', author: 'author 1', url: 'url 1', likes: 1 })

            })

            it('should show blogs in order by number of likes', function() {
                cy.get('.blogi:first').contains('blog 2')
                cy.get('.blogi:last').contains('blog 1')
            })
        })
    
        
      })
  })
