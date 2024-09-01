import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CarService } from '../../../core/services/car.service';
import { BrandDto } from '../../../shared/models/brand.dto';

@Component({
  selector: 'app-update-brand',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './update-brand.component.html',
  styleUrl: './update-brand.component.css'
})
export class UpdateBrandComponent {

  carForm: FormGroup;
  carService: CarService = inject(CarService);
  imageSrc: string | ArrayBuffer | null | File = null;
  imageToUpload: File | undefined | null;
  isValidImage: boolean = false;
  imageUrl: string = ''
  router: Router = inject(Router);
  fb: FormBuilder = inject(FormBuilder);
  brandId!: number;
  brand: any;
  constructor(private route: ActivatedRoute) {
    this.carForm = this.fb.group({
      brandName: ['', Validators.required],
      image: [null, [Validators.required]],
      isFeatured: [false]
    });
    this.brandId = this.route.snapshot.params['id'];
    this.carService.getBrandById(this.brandId).subscribe(data => {
      this.brand = data;
      this.carForm.patchValue({
        brandName: data.name,
        isFeatured: data.isFeatured,
        // image: data.image
      });
    });
  }

  ngOnInit(): void {

  }



  onFileSelected(event: Event): void {
    // console.log(event);
    console.log("on file selected");


    console.log("on file selected 2");
    this.imageToUpload = (event.target as HTMLInputElement).files?.item(0)

    if (this.imageToUpload) {
      console.log(this.carForm.controls['image'].dirty);


      if (["image/jpeg", "image/png", "image/svg+xml"].includes(this.imageToUpload.type)) {
        console.log("inside if");

        this.isValidImage = true;
        this.carForm.controls['image'].dirty
        console.log(this.isValidImage);

      } else {
        console.log("inside else");

        this.isValidImage = false;
        console.log(this.isValidImage);
      }
    }



    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.carService.uploadImage(file).subscribe(
        response => {
          console.log(response);
          this.imageUrl = response.data.imageUrl;
        })
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && e.target.result) {
          this.imageSrc = e.target.result;
        }
      };
      reader.readAsDataURL(file);
    }

  }

  fileTypeValidator(control: any) {
    const file = control.value;
    if (file) {
      const validTypes = ['image/png', 'image/jpg', 'image/jpeg'];
      if (!validTypes.includes(file.type)) {
        return { fileType: true };
      }
    }
    return null;
  }

  validateImageMimeType(control: FormControl) {
    const file = control.value;
    console.log(control.value);

    const allowedMimeTypes = ['image/jpeg', 'image/png'];
    if (file && allowedMimeTypes.indexOf(file.type) === -1) {
      return { invalidMimeType: true };
    }
    return null;
  }

  onSubmit() {
    let brandDto: BrandDto = {
      brandName: this.carForm.get('brandName')?.value,
      imageUrl: this.imageUrl,
      isFeatured: this.carForm.get('isFeatured')?.value
    }

    this.carService.updateBrand(this.brandId, brandDto)
      .subscribe(response => {
        console.log(response);
        this.router.navigate(['/all-brands'])
      });
  }
}
