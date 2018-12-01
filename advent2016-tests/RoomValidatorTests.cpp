#include "stdafx.h"
#include "CppUnitTest.h"

#include "../advent2016/RoomValidator.hpp"

using namespace Microsoft::VisualStudio::CppUnitTestFramework;
using namespace Advent2016;

namespace advent2016tests
{
    TEST_CLASS(RoomValidatorTests)
    {
    public:
        
        TEST_METHOD(TestMethod04a1)
        {
            RoomValidator validator;
            validator.addRoom("aaaaa-bbb-z-y-x-123[abxyz]");
            validator.addRoom("a-b-c-d-e-f-g-h-987[abcde]");
            validator.addRoom("not-a-real-room-404[oarel]");
            validator.addRoom("totally-real-room-200[decoy]");
            Assert::AreEqual((float)1514, (float)validator.getSumOfIds(), 0.f);
        }

        TEST_METHOD(TestMethod04b1)
        {
            RoomValidator validator;
            validator.addRoom("qzmt-zixmtkozy-ivhz-343[zimth]");
            Assert::AreEqual("very encrypted name", validator.getLastDecryptedName());
        }

    };
}
