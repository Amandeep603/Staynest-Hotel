import React from 'react'
import { Chip, type ChipProps } from './Chip'

export interface AmenityChipProps extends Omit<ChipProps, 'name'> {
  name: string
  size?: 'sm' | 'md'
}

export const AmenityChip: React.FC<AmenityChipProps> = ({ name, ...props }) => {
  return <Chip name={name} {...props} />
}
