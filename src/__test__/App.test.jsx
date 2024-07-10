import { fireEvent, render, screen } from "@testing-library/react"
import '@testing-library/jest-dom'
import App from "../App"
test("test functionality of toggleTheme inside header component" ,()=>{
      render(<App />)
      const header = screen.getByTestId(/header/i)
      const toggleTheme = screen.getByTestId(/toggle/i)
      fireEvent.click(toggleTheme)
      expect(header).toHaveClass('dark')
})