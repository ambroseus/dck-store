import { useSelector, shallowEqual as shallow } from 'react-redux'
import { select } from '../helpers/hooks'
import { TAct, Acts } from '../types'

import {
  getProcess,
  getProcessResponse,
  isProcessRunning,
  isProcessFailed,
} from './selectors'

// selectors hooks

export const useProcess = (itemType: string, act: TAct): any =>
  useSelector(select(getProcess, itemType, act), shallow)

export const useResponse = (itemType: string, act: TAct): any =>
  useSelector(select(getProcessResponse, itemType, act), shallow)

export const useLoading = (itemType: string): any =>
  useSelector(select(isProcessRunning, itemType, Acts.Load), shallow)

export const useAdding = (itemType: string): any =>
  useSelector(select(isProcessRunning, itemType, Acts.Add), shallow)

export const useUpdating = (itemType: string): any =>
  useSelector(select(isProcessRunning, itemType, Acts.Update), shallow)

export const useDeleting = (itemType: string): any =>
  useSelector(select(isProcessRunning, itemType, Acts.Delete), shallow)

export const useImporting = (itemType: string): any =>
  useSelector(select(isProcessRunning, itemType, Acts.Import), shallow)

export const useExporting = (itemType: string): any =>
  useSelector(select(isProcessRunning, itemType, Acts.Export), shallow)

export const useLoadFailed = (itemType: string): any =>
  useSelector(select(isProcessFailed, itemType, Acts.Load), shallow)

export const useAddFailed = (itemType: string): any =>
  useSelector(select(isProcessFailed, itemType, Acts.Add), shallow)

export const useUpdateFailed = (itemType: string): any =>
  useSelector(select(isProcessFailed, itemType, Acts.Update), shallow)

export const useDeleteFailed = (itemType: string): any =>
  useSelector(select(isProcessFailed, itemType, Acts.Delete), shallow)

export const useImportFailed = (itemType: string): any =>
  useSelector(select(isProcessFailed, itemType, Acts.Import), shallow)

export const useExportFailed = (itemType: string): any =>
  useSelector(select(isProcessFailed, itemType, Acts.Export), shallow)
