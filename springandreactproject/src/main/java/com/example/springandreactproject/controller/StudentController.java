package com.example.springandreactproject.controller;


import com.example.springandreactproject.model.Major;
import com.example.springandreactproject.model.Student;
import com.example.springandreactproject.repository.MajorRepository;
import com.example.springandreactproject.repository.StudentRepository;
import com.example.springandreactproject.response.StudentResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin()
@RestController
@RequestMapping("/student")
public class StudentController {

    private List<StudentResponse> listStudent=new ArrayList<>();

    private List<Major> majorList=new ArrayList<>();

    @Autowired
    private MajorRepository majorRepository;

    @Autowired
    private StudentRepository studentRepository;


    @GetMapping("/listStd")
    public ResponseEntity<?> getAllStudent(){
        listStudent=studentRepository.getAll();
        if(listStudent!=null){
            return ResponseEntity.status(HttpStatus.OK).body(listStudent);
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(listStudent);
        }
    }

    @GetMapping("/listMj")
    public ResponseEntity<?> getAllMajor(){
        majorList=majorRepository.findAll();
        return ResponseEntity.status(HttpStatus.OK).body(majorList);
    }

    @PostMapping("/addStd")
    public Student addStudent(@RequestBody Student student){
        return studentRepository.save(student);
    }

    @GetMapping("/listMj/{id}")
    public ResponseEntity<?> getById(@PathVariable(value = "id") Long id){
        Major major= majorRepository.getReferenceById(id);
        return ResponseEntity.status(HttpStatus.OK).body(major);
    }

    @GetMapping("/listStd/{id}")
    public ResponseEntity<?> getStudentById(@PathVariable(value = "id") Long id){
        Student student=studentRepository.getReferenceById(id);
        return ResponseEntity.status(HttpStatus.OK).body(student);
    }

    @PutMapping("/updateStd/{id}")
    public ResponseEntity<?> updateStudent(@PathVariable Long id,@RequestBody Student studentEdit){
        Student student=studentRepository.getReferenceById(id);
        student.setCode(studentEdit.getCode());
        student.setName(studentEdit.getName());
        student.setAge(studentEdit.getAge());
        student.setGender(studentEdit.getGender());
        student.setBirthDay(studentEdit.getBirthDay());
        student.setPhone(studentEdit.getPhone());
        student.setMajor(studentEdit.getMajor());
        Student std= studentRepository.save(student);
        return ResponseEntity.status(HttpStatus.OK).body(std);
    }

    @DeleteMapping("/deleteStd/{id}")
    public ResponseEntity<?> deleteStudent(@PathVariable Long id){
        studentRepository.deleteById(id);
        return ResponseEntity.status(HttpStatus.OK).body(true);
    }




}
