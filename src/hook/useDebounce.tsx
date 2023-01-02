import React, { useEffect, useState } from 'react'

const useDebounce = (query: string) => {

    const [debounceValue, setDebounceValue] = useState<string>(query);

    useEffect(() => {
        let timer: number | undefined;

        timer = setTimeout(() => {
            setDebounceValue(query);
        }, 200)

        return () => clearTimeout(timer);
    }, [query])

    return { debounceValue };
}

export { useDebounce }