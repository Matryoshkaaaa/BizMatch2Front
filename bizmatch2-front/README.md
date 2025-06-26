# 🛠️ React 프론트엔드 (Create React App 기반)

이 프로젝트는 **Create React App**으로 초기 세팅되었습니다.

-----

## 📦 사용 가능한 명령어

루트 디렉토리에서 아래 명령어들을 사용할 수 있습니다:

### ✅ 개발 서버 실행

```bash
npm start
```

개발 모드로 앱을 실행합니다.

브라우저에서 **http://localhost:3000**으로 접속할 수 있습니다.

코드 변경 시 자동으로 새로고침되며, 콘솔에 린트 오류가 표시됩니다.

### 🧪 테스트 실행

```bash
npm test
```

테스트 러너를 실행합니다.

파일 변경을 감지하여 테스트를 자동 재실행합니다.

### 📦 프로덕션 빌드

```bash
npm run build
```

앱을 `build` 폴더에 프로덕션용으로 빌드합니다.

React는 프로덕션 모드로 번들되고, 성능이 최적화됩니다.

파일 이름에 해시가 포함되어 배포에 적합한 상태로 생성됩니다.

빌드된 정적 파일들은 EC2 등의 서버에 업로드하여 배포할 수 있습니다.

### ⚙️ 환경 설정 추출 (eject)

```bash
npm run eject
```

⚠️ **주의: 한 번 eject하면 되돌릴 수 없습니다.**

CRA의 내부 설정(webpack, Babel 등)을 추출합니다.

직접 설정을 커스터마이징하고 싶을 때 사용합니다.

`eject` 이후에도 다른 명령어들은 기존처럼 작동합니다.

-----

## 📚 참고 자료

  * [Create React App 공식 문서](https://create-react-app.dev/docs/getting-started/)
  * [React 공식 문서](https://react.dev/learn)

-----

💡 **포트폴리오 용도에서는 `npm run build`로 정적 파일을 만들고, EC2나 S3에 배포하면 충분합니다. `eject`는 대부분의 경우 불필요합니다.**
