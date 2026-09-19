const copyToClipboard = (text: string): boolean => {
    // Create a temporary input element
    const tempInput = document.createElement("textarea")
    tempInput.setAttribute("id", "tempcopy")
    document.body.appendChild(tempInput)

    // Set the value of the input element and select it
    tempInput.value = text
    tempInput.select()

    // Execute the copy command
    document.execCommand("copy")

    // Remove the temporary input element
    document.body.removeChild(tempInput)

    return true
}

export default copyToClipboard
