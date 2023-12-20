package com.example.springandreactproject.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "Student")
public class Student{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "code")
    private String code;

    @Column(name = "ten")
    private String name;

    @Column(name = "tuoi")
    private Integer age;

    @Column(name = "gioitinh")
    private Boolean gender;

    @Column(name = "sinhnhat")
    private String birthDay;

    @Column(name ="phone")
    private String phone;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "majorid",referencedColumnName = "id")
    private Major major;
}
