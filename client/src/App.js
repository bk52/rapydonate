import React from "react";
import {
    decrement,
    increment,
    selectCount
} from './redux/counterSlice';
import { useSelector, useDispatch } from 'react-redux';

export default function App() {
    const count = useSelector(selectCount);
    const dispatch = useDispatch();
    return <>
        Counter : {count}
        <button
            aria-label="Decrement value"
            onClick={() => dispatch(decrement())}
        >
            -
        </button>
        <button
            aria-label="Increment value"
            onClick={() => dispatch(increment())}
        >
            +
        </button>
    </>
}