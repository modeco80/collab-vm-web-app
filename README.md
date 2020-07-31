
## collab-vm-web-app

ugh i have to become a webdev


## Building

First you'll need to build the Flatbuffers flatc so that you can compile the Typescript schema.

To do this:

```
mkdir fbtool
cd fbtool
cmake ../vendor/collab-vm-common/vendor/flatbuffers -DCMAKE_BUILD_TYPE=Release \ 
	-DFLATBUFFERS_BUILD_TESTS=OFF \
	-DFLATBUFFERS_BUILD_FLATHASH=OFF \
	-FLATBUFFERS_STATIC_FLATC=ON \
	-FLATBUFFERS_INSTALL=OFF \

make -j$(($(nproc)+1)) (or cmake --build . --config Release --target flatc -j 5)
```
then copy flatc into the root of fbtool (if you're using Windows/VS for instance). 