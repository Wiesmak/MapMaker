/**
 * @file _repositories.ts
 * @description This is a barrel file that re-exports all the interfaces and classes from
 * the other files in the repositories directory. This allows for easier importing
 * of these modules elsewhere in the project.
 * @module _repositories
 */

export * from './auto.interface'
export * from './auto.repository'
export * from './keyboard.interface'
export * from './keyboard.repository'
export * from './mouse.interface'
export * from './mouse.repository'
export * from './history.interface'
export * from './history.repository'
export * from './file.interface'
export * from './file.repository'