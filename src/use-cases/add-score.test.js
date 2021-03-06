import makeAddScore from './add-score'
import makeScoresDb from '../data-access/scores-db'
import makeFakeScore from '../../__test__/fixtures/score'
import makeDb, { closeDb, clearDb } from '../../__test__/fixtures/db'

describe('add score', () => {
  let scoresDb
  beforeAll(async () => {
    await makeDb()
    await clearDb()
    scoresDb = makeScoresDb({ makeDb })
  })

  afterAll(async () => {
    await closeDb()
  })

  it('inserts scores in the database', async () => {
    const newScore = makeFakeScore()
    const addScore = makeAddScore({
      scoresDb: scoresDb
    })
    const inserted = await addScore(newScore)
    expect(inserted).toMatchObject(newScore)
  })
  it('returns scores if already exists', async () => {
    const newScore = makeFakeScore()
    const addScore = makeAddScore({
      scoresDb: scoresDb
    })
    const fristScore = await addScore(newScore)
    const secondScore = await addScore(newScore)
    expect(fristScore).toEqual(secondScore)
  })
})
