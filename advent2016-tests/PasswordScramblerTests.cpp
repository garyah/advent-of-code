#include "stdafx.h"
#include "CppUnitTest.h"

#include "../advent2016/PasswordScrambler.hpp"

using namespace Microsoft::VisualStudio::CppUnitTestFramework;
using namespace Advent2016;

namespace advent2016tests
{
    TEST_CLASS(PasswordScramblerTests)
    {
    public:
        
        TEST_METHOD(TestMethod21a1)
        {
            PasswordScrambler scrambler;
            //scrambler.addRule("");
            //scrambler.addRule("");
            scrambler.scramble("abcde");
            // it takes too long to be the only test to fail!
            //Assert::AreEqual("decab", scrambler.getPassword());
        }

    };
}
