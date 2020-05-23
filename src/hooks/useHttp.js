import React, { useState, useEffect } from 'react';
import axios from 'axios';

const useHttp = (props) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [url, setUrl] = useState(props.url);
    const [options, setOptions] = useState(props.options);

    useEffect(() => {
        setIsLoading(true);
        axios.get(url)
            .then(function (response) {
                setResponse(response.data);
                setIsLoading(false);
            })
            .catch(function (error) {
                setError(error);
                setIsLoading(false);
            })
    }, [url, options]);
    
    return {response, error, isLoading, setUrl, setOptions};
};

export default useHttp;