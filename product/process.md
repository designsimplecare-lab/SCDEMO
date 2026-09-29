# How work gets done — the SimpleCare process

**Principle:** no work without a task, no task without an owner, and nothing is done until it passes
its review gates and Ani approves.

## 1. Roles in the process
| Role | Who | Does |
|---|---|---|
| **Requester** | Ani, Daniel (through Ani), or the lead on Ani's behalf | Asks for something |
| **Lead** | The main Claude session | Writes the task, assigns it, runs the agents, checks results, commits and deploys |
| **Owner** | One agent per task | Does the work and delivers the output |
| **Contributors** | Other agents named on the task | Give input the owner asked for |
| **Reviewers (gates)** | `qa-engineer`, `clinical-safety`, `privacy-security`, `accessibility`, `marketing-compliance`, `tech-lead` | Pass, fix or block, with reasons |
| **Approver** | Ani (and Daniel for clinical content) | Accepts, or sends back |

## 2. The task lifecycle
```
Requested → Triaged → Ready → In progress → In review → Approved → Done
                  ↘ Blocked (needs Daniel / Ani / data) ↗
```
1. **Requested.** Ani asks. The lead writes a task file, `product/tasks/T-NNN-<slug>.md`, from
   `product/tasks/TEMPLATE.md`, and adds a line to the board, `product/tasks/README.md`.
2. **Triaged.** The lead:
   - sets the type, priority (P1–P3) and size (S/M/L);
   - picks one **owner**, and names the contributors and the **gates** from the table in section 4;
   - checks it against the rules in `handbook/01-rules.md`.
2a. **Bulletins.** Before starting, the owner reads every bulletin in `product/training/bulletins/`
   dated after its certification. The task's Log records which bulletins were read.
3. **Ready.** The acceptance criteria are written and the inputs linked. Anything blocking is
   resolved or moved to **Blocked**.
4. **In progress.** The owner works only within the task's scope. If the scope needs to change, the
   owner stops and reports; it doesn't expand the task on its own.
5. **In review.** Each gate reviewer writes its verdict (pass / fix / block, with reasons) in its own
   report, `product/reports/<agent>-<date>-T-NNN-review.md`. (Marketing gates such as
   `marketing-compliance` use `marketing/reports/<agent>-<date>-T-NNN-review.md`.) The lead copies the verdict into the task
   file's Review section. A block is resolved before anything moves on.
6. **Approved.** Ani accepts. For clinical content, Daniel does too.
7. **Done.** The lead commits (and deploys, if the task ships something). `product-manager` updates
   the use-case and requirement statuses and the decisions.

## 3. Task types
| Type | Typical owner | Output |
|---|---|---|
| **Research** (a recording, a competitor, a user question) | `ux-researcher`, `market-strategist` | A report or notes in `shadowing/` or `research/` |
| **Spec / documentation** | `product-manager` | Updated `product/` docs |
| **Design** (a UI change in a prototype) | `ux-designer` | A prototype change, with screenshots |
| **Content** (words) | `content-designer` | A copy deck |
| **Review / audit** | a gate agent | A findings report |
| **Engineering plan** | `tech-lead`, `integrations-engineer`, `ai-engineer` | An ADR or brief |
| **Marketing** | `marketing-lead` → the specialists | Drafts in `marketing/` |
| **Bug fix** (the prototype behaves wrongly) | `frontend-engineer` (or `ux-designer` for design defects) | A fix with proof: the steps to reproduce, and the result before and after |
| **Persona walkthrough** | `doctor`, `moa`, `patient` | A ranked asks report |

## 4. Which gates apply
| If the task touches… | Gates required |
|---|---|
| Any prototype UI | `qa-engineer` |
| Results, prescribing, sign-off, AI, tasks/hand-off, identity | `clinical-safety` |
| Personal data, integrations, uploads, AI vendors, tracking | `privacy-security` |
| Anything a patient sees | `accessibility` (and `patient` walks it) |
| Anything public (site, social, ads, email, press) | `marketing-compliance` |
| Production feasibility or a new integration | `tech-lead` |

## 5. Definition of done (every task)
- The acceptance criteria are met, with **evidence**: screenshots, measurements, citations.
- It follows every rule in `handbook/01-rules.md`, including no identifiers, no invented clinical
  rules and sources for every claim.
- All required gates **pass**.
- The output ends with: the top 3 findings or asks; what needs Daniel; what needs Ani.
- The board is updated.

## 6. Communication formats
- **Asks of Daniel.** `product-manager` batches them into one list per round, most important first,
  each with its source and what it unblocks. We never send Daniel a scattered stream.
- **Reports to Ani.** The lead gives her: what changed, the proof, what's blocked, and the decisions
  she needs to make. Short, and in plain words.
- **Agent reports.** They go to `product/reports/` or `marketing/reports/`, as
  `<agent>-<YYYY-MM-DD>-<topic>.md`.

## 7. Cadence (once tasks start)
- **A round:** input arrives → the tasks are written → the owners work in parallel, up to about 6 at a
  time → the gates → Ani approves → the lead ships.
- **After each round:** `product-manager` refreshes the backlog and Daniel's question list, and the
  lead reports to Ani.

## 8. Escalation
- **A rule conflict or an ambiguous request:** the owner stops and reports to the lead, who asks Ani.
- **A clinical question:** mark it "Needs Daniel", and continue with anything that doesn't depend on
  it.
- **A privacy exposure found:** report immediately. The lead flags it to Ani, and fixes it only with
  her OK, unless it is live and urgent.
