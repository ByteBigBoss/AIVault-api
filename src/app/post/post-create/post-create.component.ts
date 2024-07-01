import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Advantage, Post, UseCases, category } from '../post.model';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { PostService } from '../post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit, OnChanges {




  categoryId: string = "";

  updatemodeCategoryId: string = "";

  updateCategory: category | undefined;

  categories: category[] = [
  ];

  isCategoryInput: boolean = false;

  // enterdCategory: string = '';

  advantages: Advantage[] = [];

  useCases: UseCases | undefined;

  keyFeatures: string[] = [];

  isLoading = false;
  form!: FormGroup;
  mode = 'create';
  private postId: any;
  post!: Post;
  iconPreview!: string;





  constructor(public postService: PostService, public route: ActivatedRoute, private CategoryService: CategoryService) {
    console.log("p-c")
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
  }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),

      content: new FormControl(null, { validators: [Validators.required] }),

      image: new FormControl(null, { validators: [Validators.required] }),

      link: new FormControl(null, { validators: [Validators.required] }),
    });

    this.CategoryService.getCategories();
    this.CategoryService.getCategoryUpdateListner().subscribe((categories: category[]) => {
      this.categories = categories
    })
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId') as string;
        this.isLoading = true;
        this.postService
          .getPost(this.postId)
          .subscribe((postData) => {
            this.isLoading = false;
            this.post = {
              id: postData._id,
              title: postData.title,
              content: postData.content,
              imagePath: postData.imagePath,
              link: postData.link,
              creator: postData.creator,
            };

            this.updateCategory = this.categories.find((category) => category.id === postData.postCategory);


            this.form.setValue({
              title: this.post.title,
              content: this.post.content,
              image: this.post.imagePath,
              link: this.post.link
            });

            this.updatemodeCategoryId = postData.postCategory;

            this.advantages = postData.advantages;

            this.keyFeatures = postData.keyFeatures;

            this.useCases = postData.useCases;


            console.log(this.form)
          });
      } else {
        this.mode = 'create';
        this.postId = '';
      }
    });
  }

  getUpdateCategory(): category {
    return (this.updateCategory as category)
  }

  setUseCases() {

  }



  onImagePiked(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.form.patchValue({ image: file });
      this.form.get('image')?.updateValueAndValidity();
      console.log(file);
      console.log(this.form);
      const reader = new FileReader();
      reader.onload = () => {
        this.iconPreview = reader.result as string;
      }
      reader.readAsDataURL(file)
    }
  }



  onAddPost() {
    if (this.form.invalid) {
      return;
    }

    // const post: Post = {
    //   title: form.value.title,
    //   content: form.value.content,
    // };

    // this.postCreated.emit(post);

    if (this.mode === 'create') {
      this.postService.addPost(this.form.value.title, this.form.value.content, this.form.value.image, this.form.value.link, this.advantages, this.keyFeatures, this.getUsecase(), this.categoryId);
    } else {
      this.postService.updatePost(
        this.postId,
        this.form.value.title,
        this.form.value.content,
        this.form.value.image,
        this.form.value.link,
        this.advantages,
        this.keyFeatures,
        this.getUsecase(),
        this.categoryId
      );
    }


  }


  onCategoryInputView() {
    this.isCategoryInput = true
  }

  onAddAdvantages(advantageInput: HTMLInputElement, discriptionInput: HTMLTextAreaElement) {
    const advantage: Advantage = {
      advantage: advantageInput.value,
      discription: discriptionInput.value
    }

    this.advantages.push(advantage);
    advantageInput.value = ""
    discriptionInput.value = ""
    console.log(this.advantages)
  }

  onAddUsecase(customerSupport: HTMLInputElement, contentCreation: HTMLInputElement, codingAssistance: HTMLInputElement) {
    this.useCases = {
      customerSupport: customerSupport.value,
      contentCreation: contentCreation.value,
      codingAssistance: codingAssistance.value
    }
    console.log(this.useCases)
  }

  getUsecase(): UseCases {
    return this.useCases as UseCases
  }

  onAddCategory(inputCategory: HTMLInputElement) {
    this.CategoryService.addCategory(inputCategory.value)
    this.isCategoryInput = false;
  }

  onAddKeyFeature(keyFeature: HTMLInputElement) {
    this.keyFeatures.push(keyFeature.value)
    keyFeature.value = ""
  }

  setCategoryId(categoryId: string) {
    this.categoryId = categoryId;
  }
}
