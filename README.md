# BizMatch

**Spring Boot + React 기반 풀스택 비즈니스 매칭 플랫폼**  
기업과 서비스 제공자를 연결해주는 플랫폼으로, 관리자 및 사용자 기능을 포함합니다.

## 🔧 기술 스택

| 구분         | 기술 스택                                         |
|--------------|--------------------------------------------------|
| Frontend     | React, Axios, React Router, styled-components    |
| Backend      | Spring Boot, Spring Security, MyBatis       |
| Database     | Oracle                                            |
| Build Tool   | Maven (.jar 생성)                                 |
| Server       | AWS EC2 (프리티어), Ubuntu                       |
| Deploy       | React 정적 빌드 + EC2에서 Spring Boot 실행       |

---

## 🧭 프로젝트 개요

- **목표**: 기업과 전문가를 연결하는 매칭 플랫폼 구현
- **역할**: 백엔드 전반, API 설계 및 개발, DB 설계 및 연동, EC2 배포 구성
- **주요 기능**:
  - 회원가입 / 로그인 (JWT 인증)
  - 게시글 등록 및 조회
  - 관리자 기능 (사용자 관리, 매칭 현황)
  - 알림 및 로그 관리

---

## 🚀 배포 방식 (무료 프리티어 기준)

### 1. EC2 인스턴스 설정
- Ubuntu 20.04 LTS (t2.micro)
- 프리티어 범위 내에서 운영

### 2. 백엔드 실행 (.jar)
```bash
$ java -jar bizmatch-backend.jar
3. 프론트엔드 정적 파일 빌드 및 배포
bash
복사
편집
$ npm run build
$ sudo cp -r build/* /var/www/html/
