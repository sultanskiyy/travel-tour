import type { ChildrenType } from '@/types/ChildrenType'
import React from 'react'

const Container = ({ children, className }: ChildrenType) => {
    return (
        <div className={`${className ?? ""} mx-auto max-w-330`}>
            {children}
        </div>
    )
}

export default Container