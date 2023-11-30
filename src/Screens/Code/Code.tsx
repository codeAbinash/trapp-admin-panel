import { Aurora } from 'aurora-react'
import 'aurora-code/themes/oneDarkPro.css'
import { useEffect, useState } from 'react'

const sampleCode = `// Implementation of Merge Sort Algorithm

#include <stdio.h>

void merge(int *arr, int low, int mid, int high) {
   int i, j, k;
   int n1 = mid - low + 1;
   int n2 = high - mid;
   int L[n1], R[n2];
   for (i = 0; i < n1; i++) L[i] = arr[low + i]; // copy left subarray
   for (j = 0; j < n2; j++) R[j] = arr[mid + 1 + j]; // copy right subarray
   i = 0;
   j = 0;
   k = low;
   while (i < n1 && j < n2) {
      if (L[i] <= R[j]) {
         arr[k] = L[i];
         i++;
      } else {
         arr[k] = R[j];
         j++;
      }
      k++;
   }
   while (i < n1) {
      arr[k] = L[i];
      i++;
      k++;
   }
   while (j < n2) {
      arr[k] = R[j];
      j++;
      k++;
   }
}

void merge_sort(int *arr, int low, int high) {
   if (low < high) {
      int mid = (low + high) / 2;
      merge_sort(arr, low, mid);
      merge_sort(arr, mid + 1, high);
      merge(arr, low, mid, high);
   }
}

int main() {
   int arr[] = {6, 5, 12, 10, 9, 1};
   int n = sizeof(arr) / sizeof(arr[0]);
   merge_sort(arr, 0, n - 1);
   for (int i = 0; i < n; i++) printf("%d ", arr[i]);
   return 0;
}

`

function LineNumber({ code, className }: { code: string; className?: string }) {
  const lines = code.split('\n').length
  return (
    <div className={'flex select-none flex-col font-normal opacity-30 ' + className}>
      {Array.from({ length: lines }).map((_, i) => (
        <span key={i}>{i + 1}</span>
      ))}
    </div>
  )
}

function Code() {
  const [code, setCode] = useState('')

  useEffect(() => {
    fetch('https://try-aurora.vercel.app/example.c').then((res) => {
      res.text().then((code) => {
        setCode(code)
      })
    })
  }, [])

  return (
    <div className='flex flex-col gap-5 pb-20'>
      <h1 className='text-3xl font-bold'>Implementation of Merge Sort Algorithm</h1>
      <p>
        Merge sort is a powerful sorting algorithm known for its efficiency. It follows a "divide and conquer" approach,
        breaking the array into smaller halves until each sub-array is sorted. The merging step combines two sorted
        arrays, resulting in a fully sorted array. With a consistent O(n log n) time complexity.
      </p>
      <p>
        Here, we have a function <PartCode>merge_sort</PartCode> that takes an array, the starting index, and the ending
        index as arguments. The function recursively calls itself to divide the array into smaller halves until the size
        of the array is 1. Then, the <PartCode>merge</PartCode> function is called to merge the two halves.
      </p>

      <div className='bg-gray-950/3'>
        <div></div>
        <div className='aurora-code halka-bg mt-2 flex max-h-[45vh] gap-5 overflow-auto rounded-2xl p-3 pl-3 text-sm font-semibold leading-relaxed'>
          <LineNumber code={sampleCode} className='hidden xl:flex' />
          <Aurora code={sampleCode} />
        </div>
      </div>
    </div>
  )
}

function PartCode({ children }: { children: React.ReactNode }) {
  return (
    <span className='rounded-sm bg-black/10 px-2 py-0.5 font-mono text-sm font-bold dark:bg-white/10'>{children}</span>
  )
}

export default Code
