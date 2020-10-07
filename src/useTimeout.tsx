import { useEffect, useRef } from 'react'

type Callback = () => void

const useTimeout = (callback: Callback, delay: number) => {
  const savedCallback = useRef<Callback>(() => null)

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    if (delay !== null) {
      const id = setTimeout(tick, delay)
      return () => clearTimeout(id)
    }
    return () => null
  }, [delay])
}

export default useTimeout
