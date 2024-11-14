/**
 * 스토리지 추상 클래스
 * 실제 환경에서 로컬 스토리지로 Todo 앱의 외부 저장소와 연동시키고,
 * 가상의 테스트 환경에서 가상의 스토리지를 이용해 테스트를 용이하게 하기 위함.
 */
export default class Storage
{
	saveItem(value){}
	loadItem(){}
	clearItem(){}
}