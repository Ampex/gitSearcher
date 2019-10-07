import React from 'react'
import renderer from 'react-test-renderer'
import '../App'
import { Item } from '../App'

describe('Test App Components', () => {

    test('Item has a props', () => {
        const tree = renderer.create(<Item />)
        expect(tree).toMatchSnapshot()
    })
})