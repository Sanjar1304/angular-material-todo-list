import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TaskInterface } from '../model/taskInterface';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  todoForm!: FormGroup;
  tasksList: TaskInterface[] = [];
  inprogressList: TaskInterface[] = [];
  doneList: TaskInterface[] = [];
  updateId!: any;
  isEditEnabled: boolean = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {

    // input form validation 
    this.inputFormValidation();
  }




  // =========== INPUT FORM VALIDATION METHOD ===========
  inputFormValidation(){
    this.todoForm = this.fb.group({
      item: ['', Validators.required], 
    })
  }





  // =========== ADD TASK METHOD ===========
  addTask(){
    this.tasksList.push({
      description: this.todoForm.value.item,
      done: false
    })
    this.todoForm.reset();
  }





  // =========== DELETE TASK METHOD FROM TASK-LIST ===========
  deleteTask(i:number){
    this.tasksList.splice(i, 1)
  }





  // =========== DELETE TASK METHOD FROM PROGRESS-LIST ===========
  deleteTaskInProgress(i:number){
    this.inprogressList.splice(i, 1)
  }






  // =========== DELETE TASK METHOD FROM DONE-LIST ===========
  deleteTaskInDone(i:number){
    this.doneList.splice(i, 1)
  }






  // =========== EDIT TASK METHOD ===========
  editTask(item: TaskInterface, index: number){
    this.todoForm.controls['item'].setValue(item.description);
    this.updateId = index;
    this.isEditEnabled = true;
  }




  updateTask(){
    this.tasksList[this.updateId].description = this.todoForm.value.item;
    this.tasksList[this.updateId].done = false
    this.todoForm.reset();
    this.updateId = undefined;
    this.isEditEnabled = false;
  }



  // =========== DROP METHOD ===========
  drop(event: CdkDragDrop<TaskInterface[]>){
    if(event.previousContainer === event.container){
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex)
    }else{
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      )
    }
  }













}
