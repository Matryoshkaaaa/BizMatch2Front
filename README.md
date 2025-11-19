# BizMatch
<div align="center">
  <img src="https://img.shields.io/badge/Spring%20Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white"/>
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black"/>
  <img src="https://img.shields.io/badge/Oracle-F80000?style=for-the-badge&logo=oracle&logoColor=white"/>
  <img src="https://img.shields.io/badge/AWS%20EC2-FF9900?style=for-the-badge&logo=amazon-aws&logoColor=white"/>
</div>

## 프로젝트 배경

BizMatch는 경영난으로 새로운 거래처 확보가 필요한 중소기업과 인력난으로 외주를 필요로 하는 기업을 
연결하는 B2B 매칭 플랫폼입니다.

- 중소기업의 수요 위축으로 인한 신규 거래처 확보 필요
- 인력난 심화로 외주를 통한 프로젝트 수행 니즈 증가
- 기업 간 효율적인 매칭을 위한 중개 플랫폼의 부재

 ##  목표
- 프로젝트 등록부터 매칭까지 원스톱 서비스 제공
- 실시간 프로젝트 상태 관리 및 알림 시스템 구현
- 관리자의 효율적인 매칭 현황 모니터링 지원

**Spring Boot + React 기반 풀스택 비즈니스 매칭 플랫폼**  
기업과 서비스 제공자를 연결해주는 플랫폼으로, 관리자 및 사용자 기능을 포함합니다.

## 기술 스택

| 구분         | 기술 스택                                         |
|--------------|--------------------------------------------------|
| Frontend     | React, Axios, React Router, styled-components    |
| Backend      | Spring Boot, Spring Security, MyBatis       |
| Database     | Oracle                                            |
| Build Tool   | Maven (.jar 생성)                                 |
| Server       | AWS EC2 (프리티어), Ubuntu                       |
| Deploy       | React 정적 빌드 + EC2에서 Spring Boot 실행       |

---

## 프로젝트 개요

- **목표**: 기업과 전문가를 연결하는 매칭 플랫폼 구현
- **역할**: 백엔드 전반, API 설계 및 개발, DB 설계 및 연동, EC2 배포 구성
- **주요 기능**:
  - 회원가입 / 로그인 (JWT 인증)
  - 게시글 등록 및 조회
  - 관리자 기능 (사용자 관리, 매칭 현황)
  - 알림 및 로그 관리

---

## 시스템 아키텍처
<img width="460" height="351" alt="image" src="https://github.com/user-attachments/assets/097970ab-830a-4e7b-b5ef-90deb3f65032" />


## 배포 방식 (무료 프리티어 기준)

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
