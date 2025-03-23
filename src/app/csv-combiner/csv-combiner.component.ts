import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-csv-combiner',
  templateUrl: './csv-combiner.component.html',
  styleUrls: ['./csv-combiner.component.css']
})
export class CSVCombinerComponent {
  mergedFilePath: string | undefined;
  selectedFiles: FileList | undefined;

  constructor(private http: HttpClient) {}

  onFileChange(event: any): void {
    this.selectedFiles = event.target.files;
  }

  mergeCSVFiles(): void {
    const apiUrl = 'http://127.0.0.1:5000/merge_csv';

    // Ensure files are selected
    if (!this.selectedFiles || this.selectedFiles.length === 0) {
      console.error('No files selected.');
      return;
    }

    const formData: FormData = new FormData();
    for (let i = 0; i < this.selectedFiles.length; i++) {
      formData.append('files', this.selectedFiles[i]);
    }

    // Make an HTTP POST request to the Flask API
    this.http.post(apiUrl, formData)
      .subscribe(
        (response: any) => {
          // Handle the API response
          console.log('API Response:', response);

          // Update the mergedFilePath or perform any other actions
          this.mergedFilePath = response.message;

          // Save the merged file using file-saver
          saveAs(new Blob([response.data]), this.mergedFilePath);
        },
        (error) => {
          // Handle API errors
          console.error('API Error:', error);
        }
      );
  }
}
