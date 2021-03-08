import React from 'react'
import { BiCopyAlt } from "react-icons/bi"

function AddressBox() {
    return (
        <div className="bg-control w-36 h-8 flex justify-around items-center rounded-lg px-4">
            <p className="text-text-secondary text-xs">0x432...123</p>
            <BiCopyAlt/>
        </div>
    )
}

export default AddressBox
