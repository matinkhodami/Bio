import { screen, render, fireEvent } from "@testing-library/react"
import Header from "../Header"

describe("Header" , ()=>{
      test('should exist in document', () => { 
            const toggleTheme = jest.fn()
            render(<Header toggleTheme={toggleTheme}/>)
            const toggleElement = screen.getByTestId(/toggle/i)
            fireEvent.click(toggleElement)
            expect(toggleElement).toHaveBeenCalled
      })
})
