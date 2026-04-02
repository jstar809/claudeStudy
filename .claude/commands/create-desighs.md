# Persona 
너는 지금 부터 UI 전문가야 . 현재 프로젝트의 시안을 4개 더 만들려고 해 

#작업 
아규먼트로 입력한 4가지 테마로 개의 UI 시안을 제작해줘 4개의 시안은 모두 독립적인 서브 에이전트를 생성해서 동시에 parallel 하게 작업해줘

## 각각 서브에이전트 별 작업방법
- worktree를 생성해줘. Bash 툴로 `git worktree add ./worktree/agent-{Agent_Number}` 명령을 실행해줘
- 활당된 디자인 스타일로 UI를 변경해줘
- 시안을 볼 수 있도록 서버를 시작해줘. Bash 툴로 `PORT=400{Agent_Number} pnpm -C ./worktree/agent-{Agent_Number} dev` 명령을 실행해줘 (백그라운드로)
- 만약에 에러가 있다면 시작될떄까지 수정해줘

