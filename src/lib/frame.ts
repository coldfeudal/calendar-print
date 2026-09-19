class FrameCascade {
    nextFrame = (func?: () => void) => {
        return new Promise<FrameCascade>((resolve) => {
            requestAnimationFrame(() => {
                func?.()
                resolve(this)
            })
        }).then(() => this)
    }
}

const nextFrame = (func?: () => void) => {
    const frameCascade = new FrameCascade()

    const promise = new Promise<FrameCascade>((resolve) => {
        requestAnimationFrame(() => {
            func?.()
            resolve(frameCascade)
        })
    })

    return Object.assign(promise, frameCascade) as FrameCascade & Promise<FrameCascade>
}

export default nextFrame
