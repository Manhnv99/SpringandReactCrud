package com.example.springandreactproject.response;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class StudentResponse {
    private Long id;

    private String code;

    private String name;

    private Integer age;

    private Boolean gender;

    private String birthDay;

    private String phone;

    private String tenMajor;
}
