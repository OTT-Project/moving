<br><br>

<div align = center>

![무빙로고 2](https://github.com/user-attachments/assets/10da6499-5b47-4f89-8e50-dd46226fa759)

</div>

<br><br>

**최신 영화 예고편과 관련 정보를 볼수 있는 OTT플랫폼** <br>
TMDB API를 이용한 OTT서비스로 카테고리별 영화 추천과 검색이 가능합니다.
<br>
영화별 연관된 추천 영화, 출연진, 스토리 등 간단한 영화 정보를 조회 하실수 있습니다.

---

> <p>사이드 프로젝트 <br> 2024.11.18 ∼ 2024.12.10</p>

<div align="right">
<h3>배포 사이트</h3>
https://moving-project-ott.vercel.app/🔗
</div>

<br>
<br>

## 📚 기술 스택

<div>

![html5](https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=black)
![css3](https://img.shields.io/badge/css3-1572B6?style=for-the-badge&logo=css3&logoColor=black)
![next](https://img.shields.io/badge/Next.js-ffffff?style=for-the-badge&logo=next.js&logoColor=black)
![ts](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![js](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javaScript&logoColor=black)
![framer](https://img.shields.io/badge/Framer-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![zustand](https://img.shields.io/badge/zustand-20232A?style=for-the-badge&logo=zustand&logoColor=white)
![tanstackquery](https://img.shields.io/badge/tanstackquery-20232A?style=for-the-badge&logo=tanstackquery&logoColor=white)
![tailwindCss](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![figma](https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=black)

</div>

<br><br>

## 📌 프로젝트 소개

<img width="451" alt="image" src="https://github.com/user-attachments/assets/b5c7bee4-82fd-41a4-a525-b1f4e4069b10" />

<p>
MOVING에서 추천하는 영화 목록을 확인할수 있습니다.
<br>
<br>
TMDB 오픈 API를 통해 영화의 각종 정보와 유튜브 key를 통해 예고편을 불러와 메인 베너에서 확인할 수 있습니다.
axios와 React Query를 통한 데이터 패칭과, pramer motion을 통한 애니메이션 효과로 부드러운 사용성, next/Image컴포넌트를 통한 이미지 최적화 작업을 중심으로 구현하였습니다.
</P>

<br><br>

## 📌 트러블 슈팅

[문제]
<br>

- 이미지 처리 부분에서 비효율성과 과도한 리랜더링으로 인해 페이지 성능 저하

[원인]

- 반응형을 위해 image속성에 fill을 적용 하였지만 사이즈 지정이
  되어있지 않아서 최적화된 이미지 용량으로 가져오지 못함
- 비동기적으로 동영상과 이미지를 가져오면서 로딩중 해당 영역이
  없어지며 CLS문제가 발생함
- 모든 이미지를 한번에 불러와 성능 부담 증가

[해결]

- fill 속성과 size속성을 추가하여 이미지 용량을 최적화해 1/10로
  이미지 용량 감소

  > 이미지 원본 사이즈로 데이터 로딩
  > ![alt text](image-1.png)
  > size속성 적용 후
  > ![alt text](image-2.png)

- 로딩시 스켈레톤 UI 적용으로 대규모 레이아웃 이동을 방지하고
  CLS를 개선하여 더 부드러운 인터랙션을 제공.
  ![alt text](image-4.png)
- lazyLoading을 적용해 메모리 사용 최적화와 초기 로딩 속도를
  개선(스크롤시 데이터 추가로 불러옴)
  ![alt text](image-3.png)

<br><br><br>

## 📈 성능 개선

> 개선전 <br>![alt text](image-5.png)

> 개선후 <br> ![alt text](image-6.png)

- LCP가 65.2% 개선
- TBT가 50% 감소
- CLS가 69.2% 개선
- Speed Index 20% 향상

<br>

## 🙍‍♂️ 팀원 소개

| 이름   | 상세 내용                                                   |
| ------ | ----------------------------------------------------------- |
| 장용한 | 기획, 메인 페이지, 장르별 카테고리 페이지, 검색 페이지 구현 |
| 염정훈 | 기획, 상세 모달 페이지, 동영상 재생페이지                   |
| 최원혁 | 기획, 웹디자인 및 와이어프레임, 랜더 페이지                 |
