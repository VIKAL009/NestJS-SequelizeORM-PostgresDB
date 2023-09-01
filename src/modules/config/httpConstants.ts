/**
 * HTTP Status Constants used in Middleware.
 *
 * @module
 */

/** Request has succeeded. */
import path from 'path'
require('dotenv').config({ path: path.join(__dirname, '../../.env') })

/** Request has succeeded, a new resource has been created. */
export const STATUS_OK_200 = 200

/** Request has been accepted, but the processing has not been completed. */
export const STATUS_ACCEPTED_202 = 202

/** Request has succeeded and no data needs to be returned. */
export const STATUS_NO_CONTENT_204 = 204

/** Request has succeeded but nothing has changed, so nothing is returned. */
export const STATUS_NOT_MODIFIED_304 = 304

/** Request could not be understood by the server, malformed, missing fields, etc... */
export const STATUS_BAD_REQUEST_400 = 400

/** Request error message for 400. */
export const STATUS_BAD_REQUEST_400_MESSAGE = 'Bad Request'

/** Request requires authentication, login. */
export const STATUS_UNAUTHORIZED_401 = 401

/** Request error message for 401. */
export const STATUS_UNAUTHORIZED_401_MESSAGE = 'Failed to authenticate'

/** Request requires a permission the already authenticated user does not have. */
export const STATUS_FORBIDDEN_403 = 403

/** Request error message for 403. */
export const STATUS_FORBIDDEN_403_MESSAGE = 'Forbidden'

/** Requested data was not found. */
export const STATUS_NOT_FOUND_404 = 404

/** Request failed due to an unknown internal server error. */
export const STATUS_SERVER_ERROR_500 = 500

/** Request failed due to the method not being implemented. */
export const STATUS_NOT_IMPLEMENTED_501 = 501

/** Request failed due to the service being unavailable. */
export const STATUS_SERVICE_UNAVAILABLE_503 = 503

/** QnAmaker URL - add new QnA pair to KnowledgeBase */
export const ADD_NEW_PAIR =
  'https://westus.api.cognitive.microsoft.com/qnamaker/v2.0/knowledgebases'

/** QnAmaker URL - delete existing QnA pair to KnowledgeBase */
export const DELETE_PAIR =
  'https://westus.api.cognitive.microsoft.com/qnamaker/v2.0/knowledgebases'

/** QnAmaker URL - update QnA pairs to KnowledgeBase */
export const UPDATE_PAIR =
  'https://westus.api.cognitive.microsoft.com/qnamaker/v2.0/knowledgebases'

/** QnAmaker URL - publish QnA pairs to KnowledgeBase */
export const PUBLISH_PAIR =
  'https://westus.api.cognitive.microsoft.com/qnamaker/v2.0/knowledgebases'

/** QnAmaker URL - train QnA pairs to KnowledgeBase */
export const TRAIN_PAIR =
  'https://westus.api.cognitive.microsoft.com/qnamaker/v2.0/knowledgebases'

/** LUIS url */
export const LUIS_URL =
  'https://westus.api.cognitive.microsoft.com/luis/api/v2.0/apps'

/** QnAmaker URL version 4 - train QnA pairs to KnowledgeBase */
export const QNA_BASE_URL_V4 = process.env.QNA_BASE_URL
  ? process.env.QNA_BASE_URL + 'knowledgebases'
  : 'https://westus.api.cognitive.microsoft.com/qnamaker/v4.0/knowledgebases'

export const QNA_BASE_URL_V4_OPERATIONS = process.env.QNA_BASE_URL
  ? process.env.QNA_BASE_URL + 'operations/'
  : 'https://westus.api.cognitive.microsoft.com/qnamaker/v4.0/operations/'
