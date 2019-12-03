import { useSelector, shallowEqual } from 'react-redux'
import { select } from '../helpers/hooks'
import { TAct, Acts, IProcess } from '../types'

import {
  getProcess,
  getProcessResponse,
  isProcessRunning,
  isProcessFailed,
} from './selectors'

// selectors hooks

export const useProcess = (itemType: string, act: TAct): IProcess =>
  useSelector(select(getProcess, itemType, act), shallowEqual)

export const useResponse = (itemType: string, act: TAct): any =>
  useSelector(select(getProcessResponse, itemType, act), shallowEqual)

export const useLoading = (itemType: string): boolean =>
  useSelector(select(isProcessRunning, itemType, Acts.Load))

export const useAdding = (itemType: string): boolean =>
  useSelector(select(isProcessRunning, itemType, Acts.Add))

export const useUpdating = (itemType: string): boolean =>
  useSelector(select(isProcessRunning, itemType, Acts.Update))

export const useDeleting = (itemType: string): boolean =>
  useSelector(select(isProcessRunning, itemType, Acts.Delete))

export const useImporting = (itemType: string): boolean =>
  useSelector(select(isProcessRunning, itemType, Acts.Import))

export const useExporting = (itemType: string): boolean =>
  useSelector(select(isProcessRunning, itemType, Acts.Export))

export const useLoadFailed = (itemType: string): boolean =>
  useSelector(select(isProcessFailed, itemType, Acts.Load))

export const useAddFailed = (itemType: string): boolean =>
  useSelector(select(isProcessFailed, itemType, Acts.Add))

export const useUpdateFailed = (itemType: string): boolean =>
  useSelector(select(isProcessFailed, itemType, Acts.Update))

export const useDeleteFailed = (itemType: string): boolean =>
  useSelector(select(isProcessFailed, itemType, Acts.Delete))

export const useImportFailed = (itemType: string): boolean =>
  useSelector(select(isProcessFailed, itemType, Acts.Import))

export const useExportFailed = (itemType: string): boolean =>
  useSelector(select(isProcessFailed, itemType, Acts.Export))
