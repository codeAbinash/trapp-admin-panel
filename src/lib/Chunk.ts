import axios, { AxiosResponse } from 'axios'

class Chunk {
  name: string
  size: number
  url: string

  totalNumber: number = 0
  start: number = 0
  file: File = {} as File
  identity: string = this.generateRandomString()
  codes: number[] = [400, 404, 415, 500, 501]

  constructor(props: { name: string; size: number; url: string }) {
    this.name = props.name
    this.size = props.size
    this.url = props.url
  }

  setFile(file: File) {
    this.file = file
    this.setTotalNumber()
  }

  setTotalNumber() {
    const total = Math.ceil(this.file.size / this.size)

    this.totalNumber = total > 0 ? total : 1
  }

  getNumber() {
    return this.start / this.size + 1
  }

  generateRandomString(length: number = 32): string {
    return [...Array(length)].map(() => (~~(Math.random() * 36)).toString(36)).join('')
  }

  slice(start: number, end: number): Blob {
    return this.file.slice(start, end - 1)
  }

  commit() {
    this.push(this.start, this.start + this.size + 1)
  }

  push(start: number, end: number) {
    const data = new FormData()
    data.append(this.name, this.slice(start, end))

    axios
      .post(this.url, data, {
        headers: {
          'x-chunk-number': this.getNumber(),
          'x-chunk-total-number': this.totalNumber,
          'x-chunk-size': this.size,
          'x-file-name': this.file.name,
          'x-file-size': this.file.size,
          'x-file-identity': this.identity,
        },
      })
      .then((response: AxiosResponse) => {
        this.start += this.size

        switch (response.status) {
          // done
          case 200:
            console.log(response.data)
            break

          // asking for the next chunk...
          case 201:
            console.log(`${response.data.progress}% uploaded...`)

            if (this.start < this.file.size) {
              this.commit()
            }
            break
        }
      })
      .catch((error) => {
        if (error.response) {
          if (this.codes.includes(error.response.status)) {
            console.warn(error.response.status, 'Failed to upload the chunk.')
          } else if (error.response.status === 422) {
            console.warn('Validation Error', error.response.data)
          } else {
            console.log('Re-uploading the chunk...')
            this.commit()
          }
        } else {
          console.log('Re-uploading the chunk...')
          this.commit()
        }
      })
  }
}

const upload = () => {
  const fileInput = document.getElementById('file') as HTMLInputElement
  const file = fileInput.files?.[0] ?? null

  if (file) {
    const chunk = new Chunk({
      name: 'video', // request name
      size: 4000, // chunk size
      url: './upload.php', // destination
    })

    chunk.setFile(file)

    // Start...
    chunk.commit()
  } else {
    console.warn('Please select a file.')
  }
}

export default upload
